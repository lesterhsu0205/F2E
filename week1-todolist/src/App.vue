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
        currentTab: 'myTask',
        localData: {
          todoItems: [{
              message: "第一筆資料",
              startDate: "2018-06-01",
              endDate: "2018-06-06",
              timestamp: 1528270961,
              stared: false,
              completed: "completed",
              comments: [],
              id: 1,
              order: 2
            },
            {
              message: "第二筆資料",
              startDate: "2018-06-01",
              endDate: "2018-06-06",
              timestamp: 1528271043,
              stared: false,
              completed: "completed",
              comments: [],
              id: 2,
              order: 1
            },
            {
              message: "第三筆資料",
              startDate: "2018-06-01",
              endDate: "2018-06-06",
              timestamp: 1528277505,
              stared: false,
              completed: "completed",
              comments: [],
              id: 3,
              order: 0
            }
          ]
        }
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
        // FIXME : json server 在展示時有點麻煩，axios 不知為啥無法 call local file，先用 static data
        // vm.$http
        //   .get(vm.api.getTodoList)
        //   .then(response => {
            // response.data
            vm.localData.todoItems.forEach((item) => {
              vm.todoItem.push(item);
            });

            // 排序
            vm.todoItem.sort((a, b) => {
              return a.order > b.order ? 1 : -1;
            });
          // });
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