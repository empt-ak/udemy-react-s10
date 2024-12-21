import { useState } from 'react'
import { DUMMY_PRODUCTS } from './dummy-products.ts'
import Shop from './components/Shop.tsx'
import Header from './components/Header.tsx'
import { CartType } from './models/cart-type.ts'
import Product from './components/Product.tsx'

const App = () => {
  const [shoppingCart, setShoppingCart] = useState<CartType>({
    items: [],
  })

  const handleAddItemToCart = (id: string) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items]

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      )
      const existingCartItem = updatedItems[existingCartItemIndex]

      if (existingCartItem) {
        updatedItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        }
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id)!
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        })
      }

      return {
        items: updatedItems,
      } as CartType
    })
  }

  const handleUpdateCartItemQuantity = (
    productId: string,
    amount: number
  ): void => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items]
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      )

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      }

      updatedItem.quantity += amount

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1)
      } else {
        updatedItems[updatedItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
      }
    })
  }

  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product product={product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </>
  )
}

export default App
