import { useContext, useRef } from 'react'

import CartModal, { ModalRef } from './CartModal.tsx'
import { CartContext } from '../store/shopping-cart-context.tsx'

export interface HeaderProps {
  onUpdateCartItemQuantity: (id: string, qty: number) => void
}

const  Header = ({  onUpdateCartItemQuantity }: HeaderProps) => {
  const {items} = useContext(CartContext)
  const modal = useRef<ModalRef>(null)

  const cartQuantity = items.length

  function handleOpenCartClick() {
    modal.current!.open()
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    )
  }

  return (
    <>
      <CartModal
        ref={modal}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  )
}

export default Header
