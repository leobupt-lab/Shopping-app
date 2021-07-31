<template>
<div class="wrapper">
  <div class="title">我的订单</div>
  <div class="items">
      <div class="item" v-for="(item, index) in list" :key="index">
          <div class="item_title">{{item.shopName}}
              <span class="item_status">{{item.isCancel ? '已取消' : '已完成'}}</span>
          </div>
          <div class="item_content">
              <div class="content_imgs">
                  <img :src="item1.product.img" alt="" class="img"
                  v-for="(item1, index1) in item.products" :key="index1"
                  >
              </div>
              <div class="content_info">
                  <div class="price">&yen;{{item.total}}</div>
                  <div class="count">共{{item.totalCount}}件</div>
              </div>
          </div>
      </div>
  </div>
</div>
  <Docker :currentIndex="2"/>
</template>

<script>
import Docker from './Docker.vue'
import { reactive, toRefs } from 'vue'
import { get } from '../utills/request.js'

const useOrder = () => {
  const data = reactive({ list: [] })
  const getOrder = async () => {
    const res = await get('/api/order')
    if (res.errno === 0) {
      const tempData = res.data
      tempData.forEach((order) => {
        const products = order.products || []
        let total = 0
        let totalCount = 0
        products.forEach((productItem) => {
          total += ((productItem?.product?.price * productItem?.orderSales) || 0)
          totalCount += productItem?.orderSales || 0
        })
        order.total = total
        order.totalCount = totalCount
      })
      data.list = tempData
    }
    return data
  }
  getOrder()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'Orderlist',
  components: { Docker },
  setup () {
    const { list } = useOrder()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 50px;
  right: 0;
  background: rgb(248, 248, 248);
}
.title {
    line-height: 44px;
    background: #fff;
    color: #333;
    font-size: 16px;
    text-align: center;
    width: 100%;
}
.items{

}
.item {
 padding: 16px ;
 margin: 16px 18px 0 18px;
 background: #fff;
 .item_title {
     line-height: 22px;
     font-size: 16px;
     color: #333;
 }
 .item_status {
     float: right;
     color: #999;
 }
 .item_content {
     position: relative;
     display: flex;
     width: 100%;
     margin-top: 16px;
     .content_imgs {
         .img {
             width: 40px;
             height: 40px;
             margin-right: 12px;
         }
     }
     .content_info {
         position: absolute;
         right: 0;
         flex: 1;
         .price{
             line-height: 20px;
             font-size: 16px;
             color: #E93B3B ;
         }
         .count {
            //  position: absolute;
            //  right: -5px;
             height: 14px;
             line-height: 14px;
             font-size: 12px;
             color: #333333 ;
             margin-top: 4px;
         }
     }
 }
}
</style>
