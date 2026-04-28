import { useState, useEffect } from 'react'

const BASE_URL = 'https://dummyjson.com/products'
export const PAGE_SIZE = 12

export function useProducts(searchQuery, page) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      const skip = (page - 1) * PAGE_SIZE

      let url = ''
      if (searchQuery && searchQuery.trim() !== '') {
        url = `${BASE_URL}/search?q=${searchQuery}&limit=${PAGE_SIZE}&skip=${skip}`
      } else {
        url = `${BASE_URL}?limit=${PAGE_SIZE}&skip=${skip}`
      }

      try {
        const response = await fetch(url)
        const data = await response.json()

        setProducts(data.products)
        setTotal(data.total)
      } catch (error) {
        setError('Erreur lors du chargement des produits', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery, page])

  return { products, total, loading, error }
}