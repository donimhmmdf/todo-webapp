<template>
  <button
    @click="handleClick"
    :class="[
      'py-1 px-2 mr-1 rounded-md  text-white font-medium hover:opacity-80 transition-all duration-500',
      bg,
    ]"
  >
    {{ children }}
  </button>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  bg: {
    type: String,
    default: "bg-blue-600",
  },
  func: {
    type: Function,
    required: true,
  },
  children: {
    type: String,
    default: "Done",
  },
});

const { bg, func, children } = toRefs(props);

const handleClick = () => {
  func.value();
};
</script>
