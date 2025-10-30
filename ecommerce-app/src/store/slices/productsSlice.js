import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fakeAPI } from '../../services/api'

// Async Thunk - Ürünleri getir
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fakeAPI.fetchProducts()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async Thunk - Tek ürün getir
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await fakeAPI.fetchProductById(productId)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    }
  },
  // extraReducers - async action'ları dinle
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCurrentProduct } = productsSlice.actions

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer