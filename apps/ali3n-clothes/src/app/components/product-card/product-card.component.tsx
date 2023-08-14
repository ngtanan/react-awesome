import Button from '../button/button.component';
import { IProduct } from '../../app.types';
import './product-card.styles.scss'

interface ProductCardProps {
  product: IProduct;
}

const ProductCard : React.FC<ProductCardProps> = ({ product }) => {
  const { name, imageUrl, price } = product
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  )
}

export default ProductCard