import { useState, useEffect, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'react-shop-cart'

export function useCart() {
  // ✅ 1. initialisation depuis localStorage
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  })

  // ✅ 2. sync vers localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  // ✅ 3. addToCart
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const exist = prev.find(item => item.id === product.id)

      if (exist) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, qty: 1 }]
      }
    })
  }, [])

  // ✅ 4. remove
  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }, [])

  // ✅ 5. clear
  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  // ✅ 6. count
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0)
  }, [cart])

  // ✅ 7. total
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [cart])

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  }
}