<template>
<div class="wrapper">
  <Staticpart />
  <Nearby />
</div>
  <Docker :currentIndex="0"/>

</template>

<script>
import Staticpart from './Staticpart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
export default {
  components: { Staticpart, Nearby, Docker },
  name: 'Home'
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
  padding: 0 18px 20px 18px;
}

</style>
