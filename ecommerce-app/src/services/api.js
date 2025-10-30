import { products } from '../data/products'

// Fake API - Gerçek API çağrısını simüle eder
export const fakeAPI = {
  // Ürünleri getir (2 saniye gecikme ile)
  fetchProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products)
      }, 2000)
    })
  },

  // Tek ürün getir
  fetchProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id))
        if (product) {
          resolve(product)
        } else {
          reject(new Error('Ürün bulunamadı'))
        }
      }, 1000)
    })
  },

  // Sipariş gönder
  submitOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: Math.random().toString(36).substr(2, 9),
          message: 'Siparişiniz alındı!'
        })
      }, 1500)
    })
  }
}