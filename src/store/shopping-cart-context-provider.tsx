import { PropsWithChildren, useReducer } from 'react'
import { CartItem } from '../models/cart-item.ts'
import { CartContext } from './shopping-cart-context.tsx'
import { DUMMY_PRODUCTS } from '../dummy-products.ts'
import { ActionTypes, CartActions } from './actions/shopping-cart-actions.ts'

type CartItems = {
  items: CartItem[]
}

const shoppingCartReducer = (
  state: CartItems,
  action: CartActions
): CartItems => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const copy = [...state.items]

      const existingCartItemIndex = copy.findIndex((it) => it.id === action.id)
      const existingCartItem = copy[existingCartItemIndex]

      if (existingCartItem) {
        copy[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        }
      } else {
        const product = DUMMY_PRODUCTS.find((p) => p.id === action.id)!
        copy.push({
          id: action.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        })
      }

      return {
        items: copy,
      }
    }
    case ActionTypes.UPDATE_ITEM: {
      const copy = [...state.items]
      const idx = copy.findIndex((it) => it.id === action.id)

      const updatedItem = {
        ...copy[idx],
      }

      updatedItem.quantity += action.qty

      if (updatedItem.quantity <= 0) {
        copy.splice(idx, 1)
      } else {
        copy[idx] = updatedItem
      }

      return {
        items: copy,
      }
    }
    default:
      return {
        items: state.items,
      }
  }
}

// see https://github.com/remix-run/react-router/discussions/10856
const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  )

  return (
    <CartContext.Provider
      value={{
        items: shoppingCartState.items,
        addItemToCart: (id: string) => {
          shoppingCartDispatch({ type: ActionTypes.ADD_ITEM, id })
        },
        updateCartItemQuantity: (id: string, qty: number) => {
          shoppingCartDispatch({ type: ActionTypes.UPDATE_ITEM, id, qty })
        },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
