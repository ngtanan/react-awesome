import { useContext } from 'react'

import { ICartItem } from '../../app.types'
import { CartContext } from '../../contexts/cart.context'

import './checkout-item.styles.scss'

type CheckoutItemProps = {
  cartItem: ICartItem
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const {
    name, imageUrl, price, quantity
  } = cartItem

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

  const clearItemHandler = () => clearItemFromCart(cartItem)
  const addItemHandler = () => addItemToCart(cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">
        {' '}
        {name}
        {' '}
      </span>
      <span className="quantity">
        <div
          role="button"
          tabIndex={0}
          className="arrow"
          onClick={removeItemHandler}
          onKeyDown={removeItemHandler}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          role="button"
          tabIndex={0}
          className="arrow"
          onClick={addItemHandler}
          onKeyDown={addItemHandler}
        >
          &#10095;
        </div>
      </span>
      <span className="price">
        {' '}
        {price}
      </span>
      <div
        role="button"
        tabIndex={0}
        className="remove-button"
        onClick={clearItemHandler}
        onKeyDown={clearItemHandler}
      >
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
