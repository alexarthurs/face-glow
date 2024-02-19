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
            default-value="#285de0"
            style="max-width: 350px"
          />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const color = ref('#5d3fdd');
const showColorPicker = ref(true);
const mouseX = ref(0);
const mouseY = ref(0);
let timeoutId: any;

// onmount
onMounted(() => {
  console.log('mounted');
  timeoutId = setTimeout(() => {
    showColorPicker.value = false;
  }, 1000);
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
  console.log(`Mouse moved to: (${e.clientX}, ${e.clientY})`);
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
