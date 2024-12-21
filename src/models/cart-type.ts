import { CartItem } from './cart-item.ts'

export type CartType = {
  items: CartItem[]
  addItemToCart: (id: string) => void
  updateCartItemQuantity: (id: string, amount: number) => void
}
