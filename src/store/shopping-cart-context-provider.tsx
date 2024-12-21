import { PropsWithChildren, useState } from 'react'
import { CartItem } from '../models/cart-item.ts'
import { CartContext } from './shopping-cart-context.tsx'
import { DUMMY_PRODUCTS } from '../dummy-products.ts'

type CartItems = {
  items: CartItem[]
}

// see https://github.com/remix-run/react-router/discussions/10856
const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCart, setShoppingCart] = useState<CartItems>({
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
      }
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
    <CartContext.Provider
      value={{
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
