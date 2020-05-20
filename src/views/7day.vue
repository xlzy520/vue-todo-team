<template>
  <div class="">
    <div style="display: flex;justify-content: space-between;overflow-x: scroll">
      <TodoList v-for="(tag, index) in checkedList"
                :key="tag"
                :todos="allTodos[keys[index]]"
                @fetchTodoList="fetchTodoList"
                :title="tag" :index="index"></TodoList>
    </div>
  </div>
</template>

<script>
  import TodoList from "./TodoList";
  import taskApi from "../api/task";

  export default {
    name: "7day",
    components: {TodoList},
    data() {
      return {
        dates: [
          {name: '今天', value: 'today'},
          {name: '明天', value: 'tomorrow'}
        ],
        checkedList: ['today', 'tomorrow'],
        indeterminate: true,
        checkAll: false,
        allTodos: {}
      }
    },
    methods: {
      fetchTodoList(){
        taskApi.getFourDay().then(res=>{
          this.allTodos = res.list || []
        })
      },

      onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < this.items.length;
        this.checkAll = checkedList.length === this.items.length;
      },
    },
    mounted() {
      this.fetchTodoList()
    }
  }
</script>

<style lang="scss">
  .date-select{
    margin-left: 20px;
  }
</style>
