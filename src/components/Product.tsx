import { Item } from '../models/item.ts'

export interface ProductProps {
  product: Item
  onAddToCart: (id: string) => void
}

const Product = ({ product, onAddToCart }: ProductProps) => {
  return (
    <article className="product">
      <img src={product.image} alt={product.title} />
      <div className="product-content">
        <div>
          <h3>{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <p>{product.description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  )
}

export default Product
