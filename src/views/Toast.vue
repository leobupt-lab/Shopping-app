<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message']
}

export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const show = (mes) => {
    toastData.showToast = true
    toastData.toastMessage = mes
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }

  const { showToast, toastMessage } = toRefs(toastData)
  return { toastData, showToast, show, toastMessage }
}
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.35);
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
}
</style>
