<template>
  <div class="mb-4">
    <div class="todo-item active">
      <div class="todo-header">
        <div class="todo-check">
          <!-- <input type="checkbox" :id="`todo-check-${todo.id}`" v-model="todo.completed"
            disabled
            :true-value="'completed'"
            :false-value="'progress'">
          <label :for="`todo-check-${todo.id}`"></label>
          <label for="todo-check1"></label> -->
        </div>
        <div class="todo-title">
          <input type="text" v-model="cacheTodo.message" class="form-control">
        </div>
        <!-- <div class="todo-control">
          <a href="#"><i class="far fa-star mr-3"></i></a>
          <a href="#"><i class="fas fa-pencil-alt"></i></a>
        </div> -->
      </div>
      <div class="todo-body">
        <div class="todo-content">
          <div class="todo-row">
            <div class="todo-icon">
              <i class="far fa-calendar-alt"></i>
            </div>
            <div>
              <label for="">Deadline</label>
              <div class="form-inline todo-form-control">
                <input type="date" class="form-control border-0" v-model="cacheTodo.startDate">
                <input type="date" class="form-control border-0 ml-2" v-model="cacheTodo.endDate">
              </div>
            </div>
          </div>
          <div class="todo-row" v-if="todo">
            <div class="todo-icon">
              <i class="far fa-comment-dots"></i>
            </div>
            <div class="todo-form-control">
              <label for="">Comment</label>
              <div class="bg-white p-3 my-3" v-for="(item, i) in cacheTodo.comments" :key="i">{{ item }}</div>
              <div>
                <textarea name="" class="form-control w-100 border-0" @keydown.shift.enter="updateComment"
                  v-model="comment"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="todo-btn-group d-flex">
          <button class="btn text-danger w-50 btn-lg" @click="closeEdit">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="btn btn-primary w-50 btn-lg" @click="update">
            <i class="fas fa-plus"></i> Update Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  props: ['todo'],
  mounted() {
    if (!this.todo.id) {
      this.isNew = true
    } else {
      // 如果為舊有資料則使用解構傳至 cacheTodo 避免物件參考特性
      this.cacheTodo = { ...this.todo}
    }
  },
  watch: {
    todo() {
      // 如果為舊有資料則使用解構傳至 cacheTodo 避免物件參考特性
      this.cacheTodo = { ...this.todo}
    }
  },
  data() {
    return {
      cacheTodo: {},
      comment: null,
      isNew: false
    }
  },
  methods: {
    updateComment() {
      const vm = this
      if (!vm.comment) {
        return
      }
      const todo = {
        ...vm.todo
      }
      todo.comments.push(vm.comment)
      vm.$http.put(vm.api.getTodoList.concat('/', vm.todo.id), todo).then((response) => {
        console.log(response)
        vm.comment = null
      })
    },
    update() {
      const vm = this
      const todo = {
        ...vm.cacheTodo
      }

      if (!vm.cacheTodo.message) {
        alert('請輸入訊息')
        return
      }

      if (this.isNew) {
        const api = vm.api.getTodoList
        todo.timestamp = Math.floor(Date.now() / 1000)
        todo.stared = false
        todo.completed = 'progress'
        todo.comments = []
        if (vm.comment) {
          todo.comments.push(vm.comment)
        }
        vm.$http.post(api, todo).then((res) => {
          if (Object.is(res.statusText, 'Created')) {
            // 可能改成建立完 item 多一個打開的 editform 上面也會有 + 
            vm.closeEdit()
          }
        });
      } else {
        if (vm.comment) {
          todo.comments.push(vm.comment)
        }
        vm.$http.put(vm.api.getTodoList.concat('/', vm.todo.id), todo).then((response) => {
          console.log(response)
        })
      }

      vm.comment = null
    },
    closeEdit() {
      this.$emit('closeEdit')
      this.$emit('refresh')
    }
  },
}

</script>
