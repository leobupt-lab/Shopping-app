<template>
<div class="nearby">
    <div class="nearby__title">附近店铺</div>
    <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item.id">
    <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../utills/request.js'
import ShopInfo from '../components/ShopInfo.vue'

const useNearbylist = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const res = await get('/api/shop/hot-list')
    if (res?.errno === 0) {
      // console.log(res)
      nearbyList.value = res.data
    }
  }
  return { getNearbyList, nearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { getNearbyList, nearbyList } = useNearbylist()

    getNearbyList()
    return { nearbyList, getNearbyList, ShopInfo }
  }
}
</script>

<style lang="scss" scoped>
.nearby {
  .nearby__title {
    margin: 16px 0 14px 0;
    height: 25px;
    line-height: 25px;
    font-size: 18px;
  }
a {
  text-decoration: none;
}
}
</style>
