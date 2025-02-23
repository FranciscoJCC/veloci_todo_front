<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" :max-width="800" persistent>
      <v-card>
        <template v-slot:title>{{ titleModal }}</template>

        <template v-slot:append>
          <v-btn icon color="secondary" variant="plain" @click="closeDialog"
            ><v-icon size="x-large">{{ mdiCloseCircleOutline }}</v-icon></v-btn
          >
        </template>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="task.title"
                  :rules="[rules.required, rules.min]"
                  label="Escribe el nombre de la tarea*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <!-- <ErrorsMessageComponent :title="'Oh! Ocurrio un error'" :type-message="'error'" :message="usersActuar.error"
            v-if="usersActuar.error !== null" /> -->
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="taskStore.action === 'update'"
            color="#f44336"
            text="Eliminar"
            variant="flat"
            @click="deleteTask"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="white"
            :text="buttonText"
            variant="tonal"
            @click="taskStore.action === 'create' ? createTask() : updateTask()"
          ></v-btn
          ><!-- @click="usersActuar.action === 'create' ? saveUser() : updateUser()" -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { mdiCloseCircleOutline } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks.store'
/* import { useUsersActuarStore } from '@/stores/actuar/users.store';
import { useModulesActuarStore } from '@/stores/actuar/modules.store'; */
/* import ErrorsMessageComponent from '@/components/ErrorsMessageComponent.vue' */

/* const usersActuar = useUsersActuarStore();
const modulesActuar = useModulesActuarStore(); */
const taskStore = useTasksStore()

const props = defineProps({
  showDialog: {
    type: Boolean,
    defualt: false,
  },
})

const dialog = ref(props.showDialog)
const valid = ref(false)
const task = taskStore.task

/* const user = usersActuar.user */
/* const itemsStatus = [
  { value: 0, text: 'Inactivo' },
  { value: 1, text: 'Activo' },
] */
/* const permissionsSelected = ref([]) */

watch(
  () => props.showDialog,
  async (newVal) => {
    dialog.value = newVal
  },
)

const emit = defineEmits(['update:tasks', 'close:dialog'])

const closeDialog = async () => {
  await taskStore.cleanTask()
  dialog.value = false
  emit('close:dialog', false)
}

const rules = {
  required: (value) => !!value || 'Requerido.',
  min: (value) => value.length >= 3 || 'Mínimo 3 caracteres.',
}

const createTask = async () => {
  await taskStore.createTask()

  if (taskStore.statusCode == 201) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      width: 500,
      title: 'Tarea registrada correctamente',
      showConfirmButton: false,
      timer: 3000,
    })
    emit('update:tasks')
    closeDialog()
  }
}

const updateTask = async () => {
  await taskStore.updateTask()

  if (taskStore.statusCode == 200) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tarea actualizada correctamente',
      showConfirmButton: false,
      timer: 3000,
    })
    await taskStore.cleanTask()
    emit('update:tasks')
    closeDialog()
  }
}

async function deleteTask(task) {
  await taskStore.deleteTask()

  if (taskStore.statusCode == 200) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tarea eliminada correctamente',
      showConfirmButton: false,
      timer: 3000,
    })
    await taskStore.cleanTask()
    emit('update:tasks')
    closeDialog()
  }
}

//Computed
const titleModal = computed(() => {
  return taskStore.action === 'create' ? 'Crear tarea' : 'Actualizar tarea'
})

const buttonText = computed(() => {
  return taskStore.action === 'create' ? 'Guardar' : 'Actualizar'
})
</script>
