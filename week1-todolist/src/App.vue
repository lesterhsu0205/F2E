<template>
  <div id="app">
    <div class="bg-primary">
      <div class="container justify-content-between d-flex todo-nav">
        <a href="#" :class="{active: currentTab === 'myTask'}" @click="currentTab = 'myTask'">My Task</a>
        <a href="#" :class="{active: currentTab === 'progress'}" @click="currentTab = 'progress'">In Progress</a>
        <a href="#" :class="{active: currentTab === 'completed'}" @click="currentTab = 'completed'">Completed</a>
      </div>
    </div>
    <div class="container my-4">
      <div class="position-relative">
        <i class="fas fa-plus fa-lg text-black-50 position-absolute" style="left: 1rem; top: 1.15rem"></i>
        <input type="text" class="form-control form-control-lg pl-5" v-model="message" @focus="add" v-if="!isNewTodo">
      </div>

      <div class="mt-4">
        <transition name="slide">
          <edit-todo v-if="isNewTodo && !currentEdit.id" @updateData="getData" @closeEditTodo="closeEdit"></edit-todo>
        </transition>

        <draggable v-model="todoItem" :options="{handle: '.handle'}" @end="sort">
          <div v-for="item in todoItem" :key="item.id" v-if="currentTab === 'myTask' || currentTab == item.completed">
            <item v-if="!Object.is(currentEdit.id, item.id)" :todo="item" @updateData="getData" @editTodo="edit"></item>
            <edit-form v-if="Object.is(currentEdit.id, item.id)" :todo="currentEdit" @updateData="getData" @closeEditTodo="closeEdit"></edit-form>
          </div>
        </draggable>
      </div>
      <!-- outer -->

      <!-- <router-view/> -->
    </div>

  </div>
</template>

<script>
  import Item from "./components/Item";
  import EditForm from "./components/EditForm";
  import draggable from "vuedraggable";

  export default {
    name: "App",
    components: {
      Item,
      EditForm,
      draggable
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
        message: "",
        todoItem: [],
        currentEdit: {},
        isNewTodo: false,
        currentTab: 'myTask'
      };
    },
    methods: {
      add() {
        this.isNewTodo = true;
        this.currentEdit = {};
      },
      getData() {
        const vm = this;
        vm.todoItem = [];
        vm.$http
          .get(vm.api.getTodoList)
          .then(response => {
            response.data.forEach((item) => {
              vm.todoItem.push(item);
            });

            // 排序
            vm.todoItem.sort((a, b) => {
              return a.order > b.order ? 1 : -1;
            });
          });
      },
      edit(id) {
        this.isNewTodo = false;
        this.currentEdit = this.todoItem.find(item => item.id === id);
      },
      closeEdit() {
        this.isNewTodo = false;
        this.currentEdit = {};
      },
      sort() {
        const vm = this;
        const amendItems = vm.todoItem.map((item, index) => {
          return {
            id: item.id,
            order: index
          }
        });
        amendItems.forEach((item) => {
          // FIXME : 這邊應該要加入接 url 的 api 才對，但太懶了 XD
          vm.$http.patch(vm.api.getTodoList.concat('/', item.id), {
            order: item.order
          });
        });
      }
    }
  };

</script>

<style lang="scss">
  // 排序功能的樣式
  .sortable-ghost {
    opacity: 0.5;
    box-shadow: 0 0 0 2px blue;
  }

  .draggable .handle {
    cursor: move;
  } // 動態效果，但後來移除不使用了
  /* .slide-enter-active {
      animation: flipInX .5s;
    }
    .slide-leave-active {
      animation: fadeOut .5s;
    } */

</style>