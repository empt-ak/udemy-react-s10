import { CartItem } from './cart-item.ts'

export type CartType = {
  items: CartItem[]
  handleAddItemToCart: (id: string) => void
}
