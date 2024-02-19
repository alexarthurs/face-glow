<template>
  <q-page
    class="row items-center justify-evenly"
    :style="{ backgroundColor: color }"
  >
    <div class="key-color">
      <div class="q-pa-md">
        <transition name="fade">
          <q-color
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
import { ref, onMounted } from 'vue';

const color = ref('#5d3fdd');

// onmount
onMounted(() => {
  console.log('mounted');
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
