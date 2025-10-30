import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import productsReducer from './slices/productsSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxCart')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxCart', serializedState)
  } catch (err) {
    console.error('LocalStorage kayıt hatası:', err)
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,  // Yeni reducer ekledik
  },
  preloadedState: preloadedState ? { cart: preloadedState } : undefined,
  devTools: true
})

store.subscribe(() => {
  saveState(store.getState().cart)
})