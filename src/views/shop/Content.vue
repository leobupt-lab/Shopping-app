<template>
<div class="content">
    <div class="list">
        <div :class="{ list_item:true, active: data.currentTab === item.tab }" v-for="(item, index) in list" :key="index" @click="clickListItem(item.tab)">{{item.name}}</div>
    </div>
    <div class="goods">
        <div class="goods_item" v-for="item in contentList" :key="item._id">
            <div class="item_img">
                <img :src="item.imgUrl" alt="">
            </div>
            <div class="item_text">
                <h4 class="title">{{item.name}}</h4>
                <p class="sales">月售{{item.sales}}件</p>
                <p class="price">
                    <span class="yen">&yen;</span>{{item.price}}
                    <span class="preprice">&yen;{{item.oldPrice}}</span>
                </p>
            </div>
            <div class="btn">
                <span class="minus" v-show="cartList?.[shopId]?.[item._id]?.count > 0" @click="minusItemCount(shopId, item._id, item)">－</span>
                <span v-show="cartList?.[shopId]?.[item._id]?.count > 0">{{cartList?.[shopId]?.[item._id]?.count}}</span>
                <span class="plus" @click="addItemCount(shopId, item._id, item)">＋</span>
            </div>
        </div>
    </div>
    <div class="goods2" v-show="state.trigger">
      <div class="clearAll">
        <div class="clear" @click="clearSelect">清除购物车</div>
      </div>
        <div class="goods_item" v-for="item in cart" :key="item._id" v-show="item.count > 0">
          <div class="select">
            <div :class="{ select_center: true, bingo: item.check }" @click="deleteItem(item._id)"></div>
          </div>
            <div class="item_img">
                <img :src="item.imgUrl" alt="">
            </div>
            <div class="item_text">
                <h4 class="title">{{item.name}}</h4>
                <p class="price">
                    <span class="yen">&yen;</span>{{item.price}}
                    <span class="preprice">&yen;{{item.oldPrice}}</span>
                </p>
            </div>
            <div class="btn">
                <span class="minus" v-show="cartList?.[shopId]?.[item._id]?.count > 0" @click="minusItemCount(shopId, item._id, item)">－</span>
                <span v-show="cartList?.[shopId]?.[item._id]?.count > 0">{{cartList?.[shopId]?.[item._id]?.count}}</span>
                <span class="plus" @click="addItemCount(shopId, item._id, item)">＋</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { get } from '../../utills/request.js'
import { useRoute } from 'vue-router'
import { ref, reactive, toRefs, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'

const list = [{
  name: '全部商品',
  tab: 'all'
},
{
  name: '秒杀',
  tab: 'seckill'
},
{
  name: '新鲜水果',
  tab: 'fruit'
},
{
  name: '休闲食品',
  tab: 'lingshi'
},
{
  name: '时令蔬菜',
  tab: 'vegetable'
},
{
  name: '肉蛋家禽',
  tab: 'egg'
}]

const useTab = () => {
  const data = reactive({
    currentTab: list[0].tab
  })

  const clickList = (tab) => {
    data.currentTab = tab
  }
  return { data, clickList }
}

const useContentList = () => {
  const route = useRoute()
  const contentList = ref([])
  const getContentList = async (tab) => {
    const res = await get(`/api/shop/${route.params.id}/products`, { tab })
    contentList.value = res.data
  }
  return { contentList, getContentList }
}

// 购物车逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const addItemCount = (shopId, productId, productInfo) => {
    store.commit('addItem', { shopId, productId, productInfo })
  }
  const minusItemCount = (shopId, productId, productInfo) => {
    store.commit('minusItem', { shopId, productId, productInfo })
  }
  return { cartList, addItemCount, minusItemCount }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const store = useStore()
    const shopId = route.params.id
    const { data, clickList } = useTab()
    const { contentList, getContentList } = useContentList()
    const { cartList, addItemCount, minusItemCount } = useCartEffect()
    const clickListItem = (tab) => {
      clickList(tab)
      getContentList(tab)
    }
    const id = route.params.id
    const cartLis = store.state.cartList
    const cart = computed(() => {
      const cartLis = store.state.cartList
      const productList = cartLis[id] || []
      return productList
    })

    const state = store.state

    watchEffect(() => {
      const flag = store.state.trigger
      return flag
    })

    getContentList('all')

    const sA = { selectAll_center: true, bingo: true }
    const clearSelect = () => {
      const productList = cartLis[id]
      for (const i in productList) {
        productList[i].count = 0
      }
    }
    const deleteItem = (itemId) => {
      cartLis[id][itemId].count = 0
    }
    return { list, contentList, clickList, data, clickListItem, cartList, shopId, addItemCount, minusItemCount, cart, cartLis, sA, clearSelect, deleteItem, watchEffect, state }
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
    bottom: 50px;
}
.list {
    overflow-y: scroll;
    width: 76px;
    height: 100%;
    background-color: #f5f5f5;
    .list_item {
        font-family: "PingFangSC-Regular";
        width: 76px;
        height: 40px;
        line-height: 40px;
        padding: 5px 0;
        font-size: 14px;
        color: #333333;
        text-align: center;
        border-radius: 2px;
    }
}
.goods {
    overflow-y: scroll;
    flex: 1;
    .goods_item {
        position: relative;
        display: flex;
        margin-left: 16px;
        margin-right: 18px;
        height: 80px;
        border-bottom: 1px solid #F1F1F1;
        .btn {
    position: absolute;
    right: 0;
    bottom: 12px;
    .minus {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px #666666 solid;
        border-radius: 50%;
        text-align: center;
        margin-right: 7px;
        line-height: 20px;
        color: #666666;
    }
    .plus {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px #4FB0F9 solid;
        background-color: #4FB0F9;
        border-radius: 50%;
        text-align: center;
        margin-left: 7px;
        color: #fff;
        line-height: 20px;
    }
}
        .item_img{
            img{
            width: 68px;
            height: 68px;
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
            .sales {
                margin: 6px 0;
                line-height: 16px;
                font-size: 12px;
            }
            .price {
                margin: 0;
                font-size: 14px;
                color: red;
                line-height: 20px;
                .yen {
                    font-size: 12px;
                }
                .preprice {
                    margin-left: 6px;
                    font-size: 10px;
                    line-height: 20px;
                    color: #999999;
                    text-decoration: line-through;
                }
            }
        }
    }
}

.active {
    background: #fff;
}

.goods2 {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  overflow-y: scroll;
  z-index: 9999;
  .trigger {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 40px;
    background: red;
  }
    .clearAll{
      height: 51px;
      width: 100%;
      border-bottom: 1px solid #F1F1F1;
      background: #FFFFFF ;
      .selectAll{
            position: absolute;
            top: 7px;
            left: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: #333333 1px solid;
            margin-right: 12px;
            margin-top: 10px;
            .selectAll_center {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              // background: #0091FF ;
            }
      }
      .selectDesc {
        position: absolute;
        top: 17px;
        left: 50px;
        color: #333333 ;
        line-height: 16px;
        font-size: 14px;
      }
      .clear {
        position: absolute;
        top: 17px;
        right: 20px;
        height: 16px;
        line-height: 16px;
        color: #333333;
      }
    }
    .goods_item {
        position: relative;
        display: flex;
        margin-left: 16px;
        margin-right: 18px;
        height: 54px;
        border-bottom: 1px solid #F1F1F1;
        .btn {
    position: absolute;
    right: 0;
    bottom: 20px;
    .minus {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px #666666 solid;
        border-radius: 50%;
        text-align: center;
        margin-right: 7px;
        line-height: 20px;
        color: #666666;
    }
    .plus {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px #4FB0F9 solid;
        background-color: #4FB0F9;
        border-radius: 50%;
        text-align: center;
        margin-left: 7px;
        color: #fff;
        line-height: 20px;
    }
          }
          .select {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: #333333 1px solid;
            margin-right: 12px;
            margin-top: 10px;
            .select_center {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              // background: #0091FF ;
            }
          }
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
            .sales {
                margin: 6px 0;
                line-height: 16px;
                font-size: 12px;
            }
            .price {
                margin: 0;
                font-size: 14px;
                color: red;
                line-height: 20px;
                .yen {
                    font-size: 12px;
                }
                .preprice {
                    margin-left: 6px;
                    font-size: 10px;
                    line-height: 20px;
                    color: #999999;
                    text-decoration: line-through;
                }
            }
        }
    }
}

.bingo {
  background: #0091FF;
}

</style>
