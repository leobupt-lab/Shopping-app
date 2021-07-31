<template>
      <div class="docker">
      <span :class="{ 'docker__item': true, 'docker__item--active': index === currentIndex }" v-for="(item, index) in dockerList" :key = index>
      <router-link :to="item.to">
      <div class = "iconfont" v-html = "item.icon" />
      <div class="docker__title">{{item.text}}</div>
      </router-link>
      </span>
  </div>
</template>

<script>

export default {
  name: 'Docker',
  components: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe64c;', text: '首页', to: { name: 'Home' }, name: 'home' },
      { icon: '&#xe785;', text: '购物车', to: { name: 'Cartlist' }, name: 'cartlist' },
      { icon: '&#xe67c;', text: '订单', to: { name: 'Orderlist' }, name: 'orderlist' },
      { icon: '&#xe651;', text: '我的', to: { name: '' }, name: '' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
.docker {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  bottom: 50px;
  padding: 0 .18rem;
  left: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid #F1F1F1 ;
  &__item {
    flex: 1;
  text-align: center;
  width: 0.3rem;
  height: 0.14rem;
  font-size: 0.1rem;
  color: #333333 ;
  .iconfont {
  font-size: 20px;
  margin-top: 7px;
  margin-bottom: 2px;
    }
    a {
      color: #333333;
      text-decoration: none;
    }
    &--active {
      a {
        color:#1FA4FC;
      }
      color:#1FA4FC;
    }
  }
}
</style>
