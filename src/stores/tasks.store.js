import { defineStore } from 'pinia'
import axiosInstance from '@/libs/axiosInstance'

export const useTasksStore = defineStore('tasksStore', {
  state: () => ({
    tasks: [],
    task: {
      _id: null,
      title: null,
      completed: null,
      createdAt: null,
    },
    loading: false,
    error: null,
    statusCode: null,
    totalPages: null,
    action: 'create',
  }),

  actions: {
    async getTasks(limit = 10, ofsset = 0) {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.get(`/tasks?limit=${limit}&offset=${ofsset}`)
        this.tasks = response.data.tasks
        this.totalPages = response.data.totalPages
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async completeTask(task) {
      this.loading = true
      this.error = null

      try {
        await axiosInstance.put(`/tasks/${task._id}`, {
          completed: !task.completed,
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createTask() {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.post('/tasks', {
          title: this.task.title,
          completed: false,
        })

        this.statusCode = response.status
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateTask() {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.put(`/tasks/${this.task._id}`, {
          title: this.task.title,
        })

        this.statusCode = response.status
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteTask() {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.delete(`/tasks/${this.task._id}`)
        this.statusCode = response.status
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async loadTask(task) {
      this.task._id = task._id
      this.task.title = task.title
      this.action = 'update'
    },

    async cleanTask() {
      this.task._id = null
      this.task.title = null
      this.action = 'create'
    },
  },
})
