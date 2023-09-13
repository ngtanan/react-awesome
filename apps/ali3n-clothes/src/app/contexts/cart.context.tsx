import {
  createContext, useState, useEffect, useMemo, useCallback, Dispatch, SetStateAction
} from 'react'
import { IProduct, ICartItem } from '../app.types'

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  addItemToCart: (productToAdd: IProduct) => void;
  removeItemFromCart: (cartItemToRemove: IProduct) => void;
  clearItemFromCart: (cartItemToClear: IProduct) => void;
  cartCount: number;
  cartTotal: number;
}

type CartProviderProps = {
  children: React.ReactNode;
}

export const addCartItem = (cartItems: ICartItem[], productToAdd: IProduct) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem))
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: ICartItem[], cartItemToRemove: IProduct) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => (cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem))
}

const clearCartItem = (cartItems: ICartItem[], cartItemToClear: IProduct) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => ({}),
  cartItems: [],
  addItemToCart: () => ({}),
  removeItemFromCart: () => ({}),
  clearItemFromCart: () => ({}),
  cartCount: 0,
  cartTotal: 0
})

export function CartProvider({ children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<ICartItem[]>([])
  const [cartCount, setCartCount] = useState<number>(0)
  const [cartTotal, setCartTotal] = useState<number>(0)

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0))
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = useCallback((productToAdd: IProduct) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }, [cartItems])

  const removeItemFromCart = useCallback((cartItemToRemove: IProduct) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }, [cartItems])

  const clearItemFromCart = useCallback((cartItemToClear: IProduct) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }, [cartItems])

  const value = useMemo(() => ({
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  }), [
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  ])

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
