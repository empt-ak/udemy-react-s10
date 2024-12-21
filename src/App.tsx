import { DUMMY_PRODUCTS } from './dummy-products.ts'
import Shop from './components/Shop.tsx'
import Header from './components/Header.tsx'
import Product from './components/Product.tsx'
import CartContextProvider from './store/shopping-cart-context-provider.tsx'

const App = () => {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  )
}

export default App
