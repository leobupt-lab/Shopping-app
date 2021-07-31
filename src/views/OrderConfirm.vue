<template>
<div class="wrapper">
  <div class="top">
    <div class="top_header">
        <router-link :to="{ path: `/shop/` + id }" >
      <div class="iconfont top_headerback">◁</div>
        </router-link>
      确认订单
    </div>
    <div class="top_receiver">
        <div class="adress_title">收货地址</div>
        <div class="adress_text">北京邮电大学西门</div>
        <div class="adress_info">
            <span class="name">jim</span>
            <span class="phone">1234567</span>
        </div>
        <div class="iconfont enter">▷</div>
    </div>
  </div>
  <div class="waibao">
  <div class="goods">
      <div class="goods_title">{{shopName}}</div>
      <div class="goods_list">
        <div
        class="goods_item"
        v-for="item in cart"
        :key="item._id"
         v-show="item.count > 0"
        >
            <div class="item_img">
                <img :src="item.imgUrl" alt="">
            </div>
            <div class="item_text">
                <h4 class="title">{{item.name}}</h4>
                <p class="price">
                    <span class="yen">&yen;{{item.price}} * {{item.count}}</span>
                    <span class="yenSum">&yen;{{(item.price * item.count).toFixed(2)}}</span>
                </p>
            </div>
        </div>
    </div>
  </div>
  </div>
<div class="order">
    <div class="order_price">实付金额
        <span class="op">&yen;{{sumPrice}}</span>
        </div>
    <div class="order_btn" @click="commitToPay">提交订单</div>
</div>
<div class="mask" v-if="trigger.flag">
    <div class="mask_window">
        <h3 class="window_title">确认支付？</h3>
        <div class="window_btn">
            <div class="btn_cancel" @click="cancel">再想想</div>
            <div class="btn_pay" @click="pay(false)">确认</div>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../utills/request.js'

export default {
  name: 'OrderConfirm',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const shopId = parseInt(id, 10)
    const store = useStore()
    const cart = computed(() => {
      const cartLis = store.state.cartList
      const productList = cartLis[id] || []
      const notEmpt = {}
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0) {
          notEmpt[i] = product
        }
      }
      return productList
    })

    const shopName = computed(() => {
      const cartLis = store.state.cartList
      const sName = cartLis[id]?.shopName || '沃尔玛'
      return sName
    })

    const sumPrice = computed(() => {
      const cartLis = store.state.cartList
      const productList = cartLis[id]
      let sum = 0
      if (productList) {
        for (const i in productList) {
          sum += (productList[i].count * productList[i].price)
        }
      }
      return sum.toFixed(2)
    })

    const pay = async (isCancel) => {
      const products = []
      for (const i in cart.value) {
        const product = cart.value[i]
        products.push({ id: product._id, num: product.count })
      }
      try {
        const res = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCancel: isCancel,
          products
        })
        if (res.errno === 0) {
          if (isCancel === false) {
            router.push({ name: 'Orderlist' })
            store.commit('clearCart', id)
          } else {
            router.back()
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    const trigger = reactive({ flag: false })
    const cancel = () => {
      trigger.flag = false
    }
    const commitToPay = () => {
      trigger.flag = true
    }
    return { cart, id, shopName, sumPrice, pay, cancel, trigger, commitToPay }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
}
.top {
    position: relative;
    height: 196px;
    background-size: 100% 159px;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;
    .top_header {
        position: relative;
        padding-top: 26px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        a {
                color: #fff;
            }
        .top_headerback {
            position: absolute;
            font-size: 22px;
            left: 18px;
        }
    }
    .top_receiver {
        position: absolute;
        left: 18px;
        right: 18px;
        bottom: 0;
        height: 111px;
        background: #fff;
        border-radius: 4px;
        .adress_title {
            padding: 16px 0 14px 16px;
            font-size: 16px;
            line-height: 22px;
            color: #333;
        }
        .adress_text {
            padding: 0px 40px 0px 16px;
            color: #333;
            font-size: 14px;
            line-height: 20px;
        }
        .adress_info {
            padding: 6px 0 0 16px;
            .name {
                color: #666;
                font-size: 12px;
                line-height: 18px;
                margin-right: 6px;
            }
            .phone {
                color: #666;
                font-size: 12px;
                line-height: 18px;
                margin-right: 6px;
            }
        }
        .enter {
            position: absolute;
            right: 16px;
            top: 50px;
            font-size: 20px;
            color: #666;
        }
    }
}

.waibao {
    overflow-y:scroll ;
    position: absolute;
    left: 0;
    right: 18px;
    top: 210px;
    bottom: 52px;
}
.goods {
    flex: 1;
    // margin-top: 16px;
    margin-left: 18px;
    // margin-right: 18px;
    background: #fff;
    border-radius: 6px;
    .goods_title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 22px;
        color: #333333;
        margin-left: 16px;
        // margin-top: 16px;
        margin-bottom: 16px;
        padding-top: 16px;
    }
    .goods_list {
        .goods_item {
        position: relative;
        display: flex;
        margin-left: 16px;
        margin-right: 18px;
        height: 65px;
        border-bottom: 1px solid #F1F1F1;
        .item_img{
            img{
            width: 46px;
            height: 46px;
            }
        }
        .item_text {
            flex: 1;
            height: 68px;
            margin-left: 16px;
            .title {
                width: 190px;
                line-height: 20px;
                font-size: 14px;
                color: #333333;
                margin: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .price {
                position: relative;
                margin: 8px 0 0 0 ;
                font-size: 14px;
                line-height: 20px;
                .yen {
                    color: red;
                    font-size: 14px;
                }
                .yenSum {
                    position: absolute;
                    right: 0;
                    margin-left: 6px;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
    }
}
    }

.order {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: #fff;
    .order_price {
        position: absolute;
        top: 14px;
            bottom: 13px;
            left: 24px;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        .op {
            margin-top: 4px;
            font-size: 18px;
            color: #151515;
        }
    }
    .order_btn {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 98px;
        background: #0091FF;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
}
.mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
    background: rgba(0,0,0,0.50);
    .mask_window {
        position: absolute;
        top: 240px;
        left: 37px;
        z-index: 99;
        width: 301px;
        height: 157px;
        background: #FFFFFF;
        border-radius: 4px;
        .window_title {
            margin: 24px auto 0 107px;
        }
        .window_btn {
            display: flex;
            position: absolute;
            top: 90px;
            left: 50%;
            transform: translateX(-50%);
            .btn_cancel {
                width: 80px;
                height: 32px;
                border: 1px solid #4FB0F9;
                border-radius: 16px;
                line-height: 32px;
                text-align: center;
                font-size: 16px;
                color: #0091FF;
                margin-right: 24px;
            }
            .btn_pay {
                width: 80px;
                height: 32px;
                border: 1px solid #4FB0F9;
                border-radius: 16px;
                line-height: 32px;
                text-align: center;
                font-size: 16px;
                color: #fff;
                background: #4FB0F9;
            }
        }
    }
}
</style>
