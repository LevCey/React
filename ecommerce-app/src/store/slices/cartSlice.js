import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null
}

// Slice oluştur (reducer + actions birlikte)
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Her reducer otomatik olarak bir action oluşturur
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },
    
    clearCart: (state) => {
      state.items = []
    },
    
    loadCart: (state, action) => {
      state.items = action.payload
    }
  }
})

// Actions'ları export et
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  loadCart
} = cartSlice.actions

// Selectors (state'ten veri çekmek için)
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0)

// Reducer'ı export et
export default cartSlice.reducer