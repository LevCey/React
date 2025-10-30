import { useState, useEffect } from 'react'

// Custom Hook: LocalStorage ile state senkronizasyonu
function useLocalStorage(key, initialValue) {
  // State'i initialize et
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // LocalStorage'dan veriyi al
      const item = window.localStorage.getItem(key)
      // Varsa parse et, yoksa initialValue kullan
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error)
      return initialValue
    }
  })

  // State değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('LocalStorage yazma hatası:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage