<template>
  <v-card class="mx-auto" max-width="400" width="400">
    <v-toolbar color="purple">
      <v-toolbar-title>Mis pendientes</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list lines="three" select-strategy="leaf">
      <v-list-subheader>{{
        'Tareas completadas: ' + tasksStore.completedTasks + ' de ' + tasksStore.totalTasks
      }}</v-list-subheader>
      <v-list-item
        v-for="item in tasksStore.tasks"
        :key="item._id"
        :subtitle="formateDate(item.createdAt)"
        :value="item._id"
        @click.stop="editTask(item)"
      >
        <template v-slot:title>
          <v-list-item-title :class="item.completed ? 'text-decoration-line-through' : ''">
            {{ item.title }}
          </v-list-item-title>
        </template>
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              :model-value="item.completed"
              @click.stop="completeTask(item)"
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
    <v-card-actions class="d-flex justify-center">
      <v-pagination
        v-model="page"
        :length="tasksStore.totalPages"
        :total-visible="3"
      ></v-pagination>
    </v-card-actions>
  </v-card>
  <FormTask
    :show-dialog="showDialogTask"
    @close:dialog="closeDialog"
    @update:tasks="refresTasksData"
  />
  <div class="float-btn">
    <v-btn color="purple" :icon="mdiPlus" size="x-large" @click="addTask"></v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { mdiPlus } from '@mdi/js'
import { useTasksStore } from '../stores/tasks.store.js'
import FormTask from './Tasks/FormTask.vue'

const tasksStore = useTasksStore()

const limit = ref(5)
const offset = ref(0)
const page = ref(1)
const showDialogTask = ref(false)

async function completeTask(task) {
  await tasksStore.completeTask(task)
  await getTasks()
}

function addTask() {
  showDialogTask.value = true
}

async function editTask(task) {
  await tasksStore.loadTask(task)
  showDialogTask.value = true
}

const getTasks = async () => {
  await tasksStore.getTasks(limit.value, offset.value)
}

function closeDialog() {
  showDialogTask.value = false
}

async function refresTasksData() {
  await getTasks()
}

function formateDate(date, format = 'MX') {
  if (date === null || date === undefined) {
    return ''
  }
  let dte = new Date(date)
  dte.setTime(dte.getTime() + new Date().getTimezoneOffset() * 60 * 1000)
  if (format == 'MX') {
    return dte.getDate() + '-' + (dte.getMonth() + 1) + '-' + dte.getFullYear()
  } else {
    const month = dte.getMonth() + 1 < 10 ? '0' + (dte.getMonth() + 1) : dte.getMonth() + 1
    const day = dte.getDate() < 10 ? '0' + dte.getDate() : dte.getDate()
    return dte.getFullYear() + '-' + month + '-' + day
  }
}

watch(page, (newValue) => {
  offset.value = (newValue - 1) * limit.value
  getTasks()
})

onMounted(async () => {
  await getTasks()
})
</script>
<style scoped>
.float-btn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
