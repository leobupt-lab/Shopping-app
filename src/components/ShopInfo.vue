<template>
<div class="shopInfo">
      <img :src="item.imgUrl" alt="" class="nearby__item__img">
      <div class="nearby__item__content">
        <div class="nearby__content__title">{{item.name}}</div>
        <div class="nearby__content__tags">
          <span class="tag" >月售{{item.sales}}</span>
          <span class="tag" >起送{{item.expressLimit}}</span>
          <span class="tag" >基础运费{{item.expressPrice}}</span>
        </div>
        <div class="count">{{item.slogan}}</div>
        <div class="nearbygap" v-if="hideborder"></div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'ShopInfo',
  props: ['item', 'hideborder']
}

</script>

<style lang="scss" scoped>
.shopInfo {
    display: flex;
    padding-top: 12px;
    .nearby__item__img {
      width: 56px;
      height: 56px;
      margin-right: 16px;
    }
    .nearby__item__content {
      flex: 1;
      .nearby__content__title {
        font-size: 16px;
        line-height: 22px;
        color: #333333;
         margin-bottom: 8px;
      }
      .nearby__content__tags {
        font-size: 13px;
        line-height: 18px;
         margin-bottom: 8px;
        .tag {
          font-size: 13px;
          line-height: 18px;
          margin-right: 16px;
        }
      }
      .count {
        color: #E93B3B;
        font-size: 13px;
        margin-bottom: 12px;
      }
      .nearbygap {
        background-color: #F1F1F1;
        height: 1px;
        width: 100%;
      }
    }
}
</style>
