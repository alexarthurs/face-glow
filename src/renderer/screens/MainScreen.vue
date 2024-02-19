<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
// import { Chrome } from '@lk77/vue3-color'
import { debounce } from 'vue-debounce'
import Store from 'electron-store'

const store = new Store()

// const components = {
//   'colour-picker': Chrome
// }

const color = ref('') as any
const showAll = ref(true)

watch(color, () => {
  if (!color.value.hex) return

  document.body.style.backgroundColor = color.value.hex
  store.set('color', color.value.hex)
})

onMounted(() => {
  window.addEventListener('mousemove', checkForIdle)
  window.addEventListener('mousemove', checkForActive)
  color.value = store.get('color')
  document.body.style.backgroundColor = color.value
})

const checkForIdle = debounce((e) => {
  showAll.value = false
}, 1500)

const checkForActive = (e) => {
  if (!showAll.value) {
    showAll.value = true
  }
}
</script>

<template>
  <v-container>
    <h1>test</h1>
    <!-- <div class="key-color">
      <transition name="fade">
        <Chrome v-show="showAll" v-model="color" :disable-alpha="true" />
      </transition>
    </div> -->
  </v-container>
</template>

<style scoped>
.key-color {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
