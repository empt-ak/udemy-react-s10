import { DUMMY_PRODUCTS } from '../dummy-products.ts'
import Product from './Product.tsx'

export interface ShopProps {
  onAddItemToCart: (id: string) => void
}

const Shop = ({ onAddItemToCart }: ShopProps) => {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product product={product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Shop
