<template>
  <div class="py-4 mt-5 shadow-sm">
    <div v-if="todos.length > 0" class="lg:flex lg:justify-start lg:flex-wrap">
      <ul v-for="(todo, index) in todos" :key="index" class="lg:w-1/3">
        <div
          class="flex justify-between mb-2 items-end rounded-md shadow-md p-4 hover:bg-primary hover:bg-opacity-10 duration-500 transition-all"
        >
          <div class="flex justify-start">
            <li v-if="todo.isDone" class="border-b-2">
              <del>{{ todo.activity }}</del>
            </li>
            <li v-else>
              <h1 class="font-semibold text-lg">{{ todo.activity }}</h1>
              <p class="">{{ todo.description }}</p>
              <p class="text-slate-500 text-sm">
                {{ todo.time }} - {{ todo.datetime }}
              </p>
            </li>
          </div>
          <div class="flex justify-end">
            <Button
              :bg="'bg-primary'"
              :func="() => doneTodo(index)"
              children="Done"
            />
            <Button
              :bg="'bg-orange-600'"
              :func="() => editTodo(todo, index)"
              children="Edit"
            />
            <Button
              :bg="'bg-red-600'"
              :func="() => deleteTodo(index)"
              children="Delete"
            />
          </div>
        </div>
      </ul>
    </div>
    <div v-else class="flex justify-center items-center mt-5 flex-col">
      <img
        src="../assets/empty.png"
        alt="No todos"
        class="w-1/2 text-center items-center"
      />
      <h1 class="text-lg font-semibold mt-5">Empty...</h1>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";

const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["deleteTodo", " doneTodo"]);

const deleteTodo = (index) => {
  emit("deleteTodo", index);
};
const doneTodo = (index) => {
  emit("doneTodo", index);
};
const editTodo = (todo, index) => {
  emit("editTodo", { todo, index });
};
</script>
