<template>
  <div class="position">
    <span class="iconfont position__icon1">&#xe603;</span>
    北京邮电大学西门
    <span class="iconfont position__icon2">&#xe60f;</span>
  </div>
  <div class="search">
    <span class="search__icon">&#xe61c;</span>
    搜索
  </div>
    <div class="imgs">
      <img src="../assets/1.png" alt="">
  </div>
  <div class="icons">
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" src="../assets/market.png" alt="">
      <p class="icons__item__img__dec">超市</p>
    </div>
  </div>
  <div class="crap"></div>
</template>

<script>

export default {
  name: 'Staticpart',
  components: 'Staticpart'
}
</script>

<style lang="scss" scoped>
.position {
  position: relative;
  padding: 16px 24px 16px 0;
  line-height: 22px;
  font-size: 16px;
  color: #333333 ;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .position__icon1 {
    position: relative;
    top: 1px;
    font-size: 19px;
    padding-right: 8.5px;
  }
  .position__icon2 {
    position: absolute;
    top: 18px;
    right: 0;
    font-size: 17px;
  }
}

.imgs {
  margin-top: 12px;
}
.search {
  position: relative;
  background-color:#F5F5F5 ;
  width: 339px;
  height: 32px;
  border-radius: 16px;
  line-height: 32px;
  font-size: 16px;
  color: #B7B7B7 ;
  padding-left: 44px;
  box-sizing: border-box;
  .search__icon {
    position: absolute;
    top: 0px;
    left: 16px;
    font-size: 16px;
  }
}
.img {
  width: 339px;
  height: 86px;
  border-radius: 4px;
}
.icons {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  .icons__item {
    width: 20%;
    .icons__item__img {
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }
    .icons__item__img__dec {
      color: #333333;
      text-align: center;
      font-size: 12px;
    }
  }
}
.crap {
  margin: 0 -19px 0 -18px;
  height: 10px;
  background-color: #F1F1F1;
}
</style>
