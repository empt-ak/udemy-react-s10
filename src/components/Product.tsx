import { Item } from '../models/item.ts'
import { useContext } from 'react'
import { CartContext } from '../store/shopping-cart-context.tsx'

export interface ProductProps {
  product: Item
}

const Product = ({ product }: ProductProps) => {
  const { handleAddItemToCart } = useContext(CartContext)

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
          <button onClick={() => handleAddItemToCart(product.id)}>
            Add to Cart
          </button>
        </p>
      </div>
    </article>
  )
}

export default Product
