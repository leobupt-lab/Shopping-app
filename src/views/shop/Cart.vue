<template>
<div class="cart">
  <div class="check">
      <div class="icon" @click="cartFlag()">
          <img src="../../assets/cart.png" alt="">
          <div class="tip">{{countSum}}</div>
      </div>
      <div class="sum">
        总计：<span class="sum_num">&yen;{{sumPrice}}</span>
      </div>
      <div class="payBtn" @click="toPay">
        <router-link :to="{ path: `/orderconfirm/`+ shopId }">
            去结算
        </router-link>
        </div>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const computedPrice = () => {
  const store = useStore()
  const route = useRoute()
  const id = route.params.id
  const cartList = store.state.cartList
  const countSum = computed(() => {
    const productList = cartList[id]
    let total = 0
    if (productList) {
      for (const i in productList) {
        total += productList[i].count
      }
    }
    return total
  })

  const sumPrice = computed(() => {
    const productList = cartList[id]
    let sum = 0
    if (productList) {
      for (const i in productList) {
        sum += (productList[i].count * productList[i].price)
      }
    }
    return sum.toFixed(2)
  })
  const cart = computed(() => {
    const productList = cartList[id] || []
    return productList
  })

  return { countSum, sumPrice, cart, id }
}

export default {
  name: 'Cart',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { countSum, sumPrice, cart } = computedPrice()
    const showCart = ref(false)
    const cartFlag = () => {
      store.commit('changeFlag')
    }
    const shopId = route.params.id
    const toPay = () => {
      if (countSum !== 0) {
        router.push({ path: '/orderconfirm/' + shopId })
      } else {
        alert('请选购商品')
      }
    }
    return { countSum, sumPrice, cart, cartFlag, showCart, shopId, toPay }
  }
}
</script>

<style lang="scss" scoped>
.cart {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    z-index: 9999;
}
.check {
    display: flex;
    .icon{
        position: relative;
        width: 40px;
        margin-left: 24px;
        margin-top: 8px;
        img {
            width: 40px;
        }
        .tip {
          position: absolute;
          top: -5px;
          left: 26px;
          min-width: 15px;
          height: 15px;
          line-height: 15px;
          text-align:center;
          font-size: 12px;
          border-radius: 50%;
          background: red;
          color: #fff;
        }
    }
    .sum {
        height: 49px;
        line-height: 49px;
        font-size: 12px;
        color: #333333;
        margin-left: 32px;
        .sum_num {
            position: relative;
            top: 2px;
            font-size: 18px;
            color: #E93B3B ;
            font-weight: 900;
        }
    }
    .payBtn {
        position: absolute;
        right: 0;
        width: 98px;
        height: 49px;
        background-color: #4FB0F9;
        color: #fff;
        text-align: center;
        line-height: 49px;
        font-size: 16px;
        a {
          text-decoration: none;
          color: #fff;
        }
    }
}

</style>
