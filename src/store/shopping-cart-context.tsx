import { createContext } from 'react'
import { CartType } from '../models/cart-type.ts'

export const CartContext = createContext<CartType>({
  items: [],
})
