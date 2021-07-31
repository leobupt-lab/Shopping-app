<template>
<div class="wrapper" >
  <div class="search">
      <div class="search_back" @click="backHome"> ◁ </div>
      <div class="search_content">
          <span class="search_icon">○</span>
          <input class="input" placeholder = '输入商品搜索'/>
      </div>
  </div>
  <ShopInfo :item ="data.item" :hideborder="false"/>
  <Content />
</div>
<Cart />
<div class="mask" v-show="state.trigger"></div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { get } from '../../utills/request.js'
import { useRouter, useRoute } from 'vue-router'
import { reactive } from 'vue'
import { useStore } from 'vuex'

const useShopInfo = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const store = useStore()
  const cartFlag = () => {
    store.commit('changeFlag')
  }
  // 获取跳转的商店信息
  const getItemData = async () => {
    const res = await get(`/api/shop/${route.params.id}`)
    if (res?.errno === 0) {
      data.item = res.data
    }
  }
  return { data, getItemData, cartFlag }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = store.state
    const { data, getItemData } = useShopInfo()
    getItemData()

    const backHome = () => {
      router.push({ name: 'Home' })
    }

    return { getItemData, backHome, data, state }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0 18px;
}
.search{
    display: flex;
    height: 32px;
    margin: 16px 0 4px 0;
    .search_back {
        width: 30px;
        height: 32px;
        line-height: 32px;
        font-size: 25px;
        padding-right: 5px;
        color: #B6B6B6 ;
    }
    .search_content{
        display: flex;
        flex: 1;
        line-height: 32px;
        border-radius: 16px;
        background: #f5f5f5;
        .search_icon {
            width: 44px;
            height: 32px;
            font-size: 30px;
            text-align: center;
            transform: translateY(-10%);
            color: #B6B6B6 ;
        }
        .input {
            display: block;
            width: 100%;
            outline: none;
            border: none;
            height: 30px;
            font-size: 16px;
            background: none;
            &::placeholder {
                color: rgba(0,0,0,0.50)
            }
        }
    }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 600px;
  background: rgba(0,0,0,0.50);
  opacity: 50%;
}
</style>
