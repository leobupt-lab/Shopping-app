import { createStore } from 'vuex'

const setLocalStorage = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    trigger: false,
    cartList: getLocalStorage()
  },
  mutations: {
    addItem (state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        product.check = 0
      }
      product.count += 1
      if (product.count > 0) { product.check = true }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    minusItem (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      if (product.count > 0) {
        product.count -= 1
      } else {
        product.count = 0
      }
      setLocalStorage(state)
    },
    changeFlag (state) {
      if (state.trigger === true) {
        state.trigger = false
      } else {
        state.trigger = true
      }
      setLocalStorage(state)
    },
    clearCart (state, shopId) {
      for (const i in state.cartList[shopId]) {
        state.cartList[shopId][i].count = 0
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
