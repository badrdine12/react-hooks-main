import { createContext, useContext } from 'react'
import { useCart } from '../hooks/useCart.js'

// =============================================================
// CartContext — accessible dans toute l'arborescence
// =============================================================
export const CartContext = createContext(null)

// CartProvider est rendu dans main.jsx autour de <App>
export function CartProvider({ children }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

// Hook de commodité — fourni par le professeur, ne pas modifier
export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext doit être utilisé dans un CartProvider')
  }
  return context
}
