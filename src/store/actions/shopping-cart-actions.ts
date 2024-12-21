export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
}

export type AddItemToCart = {
  type: ActionTypes.ADD_ITEM
  id: string
}

export type UpdateItemInCart = {
  type: ActionTypes.UPDATE_ITEM
  id: string
  qty: number
}

export type CartActions = AddItemToCart | UpdateItemInCart
