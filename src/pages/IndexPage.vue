<template>
  <q-page
    class="row items-center justify-evenly"
    :style="{ backgroundColor: color }"
  >
    <div class="key-color">
      <div class="q-pa-md">
        <transition name="fade">
          <q-color
            v-if="showColorPicker"
            dark
            v-model="color"
            style="max-width: 350px"
          />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    electron: any;
  }
}

import { ref, onMounted, watch } from 'vue';
const { electron } = window;

const showColorPicker = ref(true);
const mouseX = ref(0);
const mouseY = ref(0);
let timeoutId: any;

// onmount

const color = ref('');

electron.invoke('get-color').then((newColor: any) => {
  color.value = newColor;
});
onMounted(async () => {
  watch(color, (newColor) => {
    electron.invoke('set-color', newColor);
  });
});

watch(
  () => [mouseX.value, mouseY.value],
  () => {
    clearTimeout(timeoutId);
    showColorPicker.value = true;
    timeoutId = setTimeout(() => {
      showColorPicker.value = false;
    }, 2000);
  },
  { immediate: true }
);

window.addEventListener('mousemove', (e) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
});
</script>

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
