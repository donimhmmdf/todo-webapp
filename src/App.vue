<template>
  <div class="container pt-10 items-center">
    <header>
      <h1 class="font-semibold text-2xl mb-4">Todo List</h1>
      <div class="flex w-full gap-2 h-11">
        <input
          @keyup.enter="searchTodo(searchKeyTodo)"
          type="text"
          v-model="searchKeyTodo"
          class="p-2 w-full rounded-md border border-primary focus:border-primary shadow-sm"
          placeholder="Search todo..."
        />
        <select
          class="rounded-md border border-primary shadow-sm"
          v-model="filter"
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <div>
          <button class="hover:opacity-80 transition-all duration-500">
            <svg
              width="50"
              height="50"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_18_489)">
                <rect x="4" width="38" height="38" rx="5" fill="#6C63FF" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.1249 8.5488C23.3387 8.91735 23.321 9.3762 23.0791 9.72705C22.3455 10.7915 21.916 12.0806 21.916 13.4733C21.916 17.1243 24.8757 20.084 28.5266 20.084C29.9194 20.084 31.2085 19.6545 32.2729 18.9208C32.6238 18.6791 33.0826 18.6613 33.4512 18.8751C33.8197 19.089 34.0319 19.4962 33.9961 19.9208C33.5191 25.567 28.7867 30 23.0178 30C16.9328 30 12 25.0672 12 18.9822C12 13.2133 16.433 8.48087 22.0792 8.00392C22.5038 7.96806 22.911 8.18024 23.1249 8.5488ZM20.1799 10.6346C16.7045 11.8157 14.2036 15.1073 14.2036 18.9822C14.2036 23.8502 18.1498 27.7964 23.0178 27.7964C26.8927 27.7964 30.1843 25.2955 31.3654 21.8202C30.4741 22.1232 29.5191 22.2875 28.5266 22.2875C23.6587 22.2875 19.7124 18.3413 19.7124 13.4733C19.7124 12.4809 19.8768 11.5258 20.1799 10.6346Z"
                  fill="#F7F7F7"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
    <main>
      <List
        :todos="filterTodo"
        @deleteTodo="handleDeletTodo"
        @doneTodo="handleDoneTodo"
        @editTodo="handleEditTodo"
      />
      <div class="flex justify-end">
        <button
          class="hover:opacity-80 transition-all duration-500"
          @click="openModal()"
        >
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_18_493)">
              <circle cx="29" cy="29" r="25" fill="#6C63FF" />
            </g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.5 39.5C27.5 39.8978 27.658 40.2794 27.9393 40.5607C28.2206 40.842 28.6022 41 29 41C29.3978 41 29.7794 40.842 30.0607 40.5607C30.342 40.2794 30.5 39.8978 30.5 39.5V30.5H39.5C39.8978 30.5 40.2794 30.342 40.5607 30.0607C40.842 29.7794 41 29.3978 41 29C41 28.6022 40.842 28.2206 40.5607 27.9393C40.2794 27.658 39.8978 27.5 39.5 27.5H30.5V18.5C30.5 18.1022 30.342 17.7206 30.0607 17.4393C29.7794 17.158 29.3978 17 29 17C28.6022 17 28.2206 17.158 27.9393 17.4393C27.658 17.7206 27.5 18.1022 27.5 18.5V27.5H18.5C18.1022 27.5 17.7206 27.658 17.4393 27.9393C17.158 28.2206 17 28.6022 17 29C17 29.3978 17.158 29.7794 17.4393 30.0607C17.7206 30.342 18.1022 30.5 18.5 30.5H27.5V39.5Z"
              fill="#F7F7F7"
            />
          </svg>
        </button>
      </div>
      <Modal :open="isOpen" @close="isOpen = false">
        <h1 class="font-bold text-xl">
          {{ isEdit ? "Edit Activity" : "Add Activity" }}
        </h1>
        <div class="p-4">
          <form @submit.prevent="isEdit ? updateTodo() : addTodo()">
            <label for="activity" class="font-semibold text-sm"
              >Activity Name</label
            >
            <input
              type="text"
              v-model="currentTodo.activity"
              class="block rounded-md my-3"
              placeholder="Activity..."
              required
            />
            <label for="description" class="font-semibold text-sm"
              >Description</label
            >
            <input
              type="text"
              v-model="currentTodo.description"
              class="block w-full rounded-md my-3"
              placeholder="Description..."
            />
            <label for="time" class="font-semibold text-sm">Time</label>
            <input
              type="time"
              v-model="currentTodo.time"
              class="block w-full rounded-md my-3"
            />
            <label for="datetime" class="font-semibold text-sm">Datetime</label>
            <input
              type="date"
              v-model="currentTodo.datetime"
              class="block w-full rounded-md mt-3"
            />

            <button
              class="mt-5 py-1 px-2 mr-1 rounded-md bg-primary text-white font-medium hover:opacity-80 transition-all duration-500"
            >
              {{ isEdit ? "Update" : "Add" }}
            </button>
          </form>
        </div>
      </Modal>
    </main>
  </div>
</template>

<script setup>
import List from "./components/List.vue";
import Button from "./components/Button.vue";
import Modal from "./components/Modal.vue";
import { computed, onMounted, reactive, ref } from "vue";

const searchKeyTodo = ref("");
const isEdit = ref(false);
const isOpen = ref(false);
const filter = ref("all");
const currentTodo = reactive({
  activity: "",
  description: "",
  time: "",
  datetime: "",
});
const todos = reactive({
  list: [],
});
let editIndex = -1;

onMounted(() => {
  const items = localStorage.getItem("todos");
  todos.list = items ? JSON.parse(items) : [];
});

const clearForm = () => {
  currentTodo.activity = "";
  currentTodo.description = "";
  currentTodo.time = "";
  currentTodo.datetime = "";
};

const addTodo = () => {
  todos.list.unshift({
    ...currentTodo,
    isDone: false,
  });
  saveToLocalStorage();
  clearForm();
  isOpen.value = false;
};

const updateTodo = () => {
  if (editIndex !== -1) {
    todos.list[editIndex] = {
      ...currentTodo,
      isDone: todos.list[editIndex].isDone,
    };
    saveToLocalStorage();
    clearForm();
    isOpen.value = false;
    editIndex = -1;
  }
};

const openModal = (todo = null, index = -1) => {
  isOpen.value = true;
  isEdit.value = todo !== null;
  if (isEdit.value) {
    editIndex = index;
    currentTodo.activity = todo.activity;
    currentTodo.description = todo.description;
    currentTodo.time = todo.time;
    currentTodo.datetime = todo.datetime;
  } else {
    clearForm();
  }
};

const filterTodo = computed(() => {
  return todos.list.filter((todo) => {
    const matchesSearchKey =
      searchKeyTodo.value === "" ||
      todo.activity.toLowerCase().includes(searchKeyTodo.value.toLowerCase());
    const matchesFilter =
      filter.value === "all" ||
      (filter.value === "complete" && todo.isDone) ||
      (filter.value === "incomplete" && !todo.isDone);
    return matchesSearchKey && matchesFilter;
  });
});

const searchTodo = (searchKeyTodo) => {
  return filterTodo.value.filter((todo) => todo.activity == searchKeyTodo);
};

const handleDeletTodo = (todoIndex) => {
  todos.list = todos.list.filter((item, index) => {
    if (index != todoIndex) {
      return item;
    }
  });
  saveToLocalStorage();
};

const handleDoneTodo = (todoIndex) => {
  todos.list = todos.list.filter((item, index) => {
    if (index == todoIndex) {
      item.isDone = true;
    }
    return item;
  });
  saveToLocalStorage();
};
const handleEditTodo = ({ todo, index }) => {
  openModal(todo, index);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos.list));
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
body {
  font-family: "Inter", sans-serif;
}
</style>
