<template>
  <transition name="modal">
    <div
      v-if="open"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg relative">
        <button class="absolute top-5 right-5" @click="$emit('close')">
          Close
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
