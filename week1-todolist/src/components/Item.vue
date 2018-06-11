<template>
  <div class="mb-4">
    <div class="todo-item" :class="{stared: stared}">
      <div class="handle text-muted"><i class="fas fa-ellipsis-v"></i></div>
      <div class="todo-header">
        <div class="todo-check">
          <input type="checkbox" :id="'todo-check-'.concat(todo.id)" v-model="todo.completed"
            @change="updateStatus('completed', todo.completed)"
            true-value="completed" false-value="progress">
          <label :for="`todo-check-${todo.id}`"></label>
        </div>
        <label class="todo-title" :for="'todo-check-'.concat(todo.id)">
          <span :class="{completed: Object.is(todo.completed, 'completed')}">{{ todo.message }}</span>
        </label>
        <div class="todo-control">
          <a href="#" class="text-muted" @click.prevent="updateStatus('stared', !stared)">
            <i class="far fa-star mr-3" v-if="!this.stared"></i>
            <i class="fas fa-star mr-3" v-else></i>
          </a>
          <a href="#" class="text-muted" @click.prevent="editTodo"><i class="fas fa-pencil-alt mr-3"></i></a>
          <a href="#" class="text-muted" @click.prevent="remove"><i class="fas fa-trash-alt mr-3"></i></a>
        </div>
      </div>
      <div class="todo-footer text-secondary">
        <i class="far fa-calendar-alt" v-if="todo.startDate || todo.endDate"></i>
        <span>from: {{ todo.endDate }}</span>
        <span v-if="todo.startDate && todo.endDate"> ~ </span>
        <span>to: {{ todo.endDate }}</span>
        <!-- <i class="far fa-file ml-3"></i> -->
        <i class="fas fa-comment-dots ml-3"></i> {{ todo.comments.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['todo'],
  data() {
    return {
      // 沒有 v-model 再綁定，只能用這奧步
      stared: this.$props.todo.stared,
    }
  },
  methods: {
    updateStatus(field, state) {
      const vm = this
      // 為了避免物件傳參考特性，因此使用 ES6 解構
      const todo = {
        ...vm.todo
      }

      todo[field] = state

      vm.$http.put(vm.api.getTodoList.concat('/', vm.todo.id), todo).then((response) => {

        console.log(response)

        if (Object.is(response.statusText, 'OK') && Object.is('stared', field)) {
          vm.stared = state
        }
      })
    },
    editTodo() {
      this.$emit('edit', this.todo.id)
    },
    remove() {
      const vm = this
      vm.$http.delete(vm.api.getTodoList.concat('/', vm.todo.id)).then((response) => {

        console.log(response)

        if (Object.is(response.statusText, 'OK')) {
          vm.$emit('refresh')
        }
      })
    }
  }
}

</script>
