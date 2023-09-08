import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { IProduct, ICartItem } from "../app.types";

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  addItemToCart: (product: IProduct) => void;
  cartCount: number;
}

type CartProviderProps = {
  children: React.ReactNode;
}



export const addCartItem = (cartItems: ICartItem[], productToAdd: IProduct) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => ({}),
  cartItems: [],
  addItemToCart: () => ([]),
  cartCount: 0
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0));
  }, [cartItems])

  const addItemToCart = (product: IProduct) => setCartItems(addCartItem(cartItems, product));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
