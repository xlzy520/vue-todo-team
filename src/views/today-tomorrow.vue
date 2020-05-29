<template>
  <div class="">
<!--    <div style="padding: 3px">-->
<!--      <v-select :items="items" v-model="list" :multiple="true"></v-select>-->
<!--    </div>-->

<!--    <div class="date-select">-->
<!--      <a-checkbox-group v-model="checkedList" :options="dates" @change="onChange"/>-->
<!--    </div>-->


    <div style="display: flex;justify-content: space-between;overflow-x: scroll">
      <TodoList v-for="(tag, index) in checkedList"
                :key="tag"
                :todos="allTodos[dates[index].value]"
                @fetchTodoList="fetchTodoList"
                @updateTodo="updateTodo"
                :title="dates[index].label" :index="index"></TodoList>
    </div>
  </div>
</template>

<script>
  import TodoList from "./TodoList";
  import taskApi from "../api/task";

  export default {
    name: "myTodoList",
    components: {TodoList},
    data() {
      return {
        items: ['今天', '明天'],
        dates: [
          {label: '今天', value: 'today'},
          {label: '明天', value: 'tomorrow'}
        ],
        checkedList: ['today', 'tomorrow'],
        indeterminate: true,
        checkAll: false,
        allTodos: {}
      }
    },
    methods: {
      updateTodo(data){
        this.allTodos[this.dates[data.index].value] = data.val
      },
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
