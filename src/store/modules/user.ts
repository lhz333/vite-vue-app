import { defineStore } from 'pinia'

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count += 1
    }
  }
})

export default useUserStore
