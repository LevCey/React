import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'

// LocalStorage'dan yükle
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

// LocalStorage'a kaydet
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxCart', serializedState)
  } catch (err) {
    console.error('LocalStorage kayıt hatası:', err)
  }
}

// Preloaded state ile store oluştur
const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: preloadedState ? { cart: preloadedState } : undefined,
  devTools: true
})

// Her state değişiminde localStorage'a kaydet
store.subscribe(() => {
  saveState(store.getState().cart)
})