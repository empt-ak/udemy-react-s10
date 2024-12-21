import {
  ComponentRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import Cart from './Cart.js'

export interface CartModalProps {
  title: string
  actions: ReactNode
}

type Handle = {
  open: () => void
}

export type ModalRef = ComponentRef<typeof CartModal>

const CartModal = forwardRef<Handle, CartModalProps>(
  ({ title, actions }: CartModalProps, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          dialog.current!.showModal()
        },
      }
    })

    return createPortal(
      <dialog id="modal" ref={dialog}>
        <h2>{title}</h2>
        <Cart />
        <form method="dialog" id="modal-actions">
          {actions}
        </form>
      </dialog>,
      document.getElementById('modal')!
    )
  }
)

export default CartModal
