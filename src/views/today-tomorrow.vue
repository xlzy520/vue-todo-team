<template>
  <div class="">
<!--    <div style="padding: 3px">-->
<!--      <v-select :items="items" v-model="list" :multiple="true"></v-select>-->
<!--    </div>-->

    <div class="date-select">
      <a-checkbox-group v-model="checkedList" :options="items" @change="onChange"/>
    </div>


    <div style="display: flex;justify-content: space-between;overflow-x: scroll">
      <TodoList v-for="tag in checkedList" :key="tag" :title="tag"></TodoList>
    </div>
  </div>
</template>

<script>
  import TodoList from "./TodoList";

  export default {
    name: "myTodoList",
    components: {TodoList},
    data() {
      return {
        items: ['今天', '明天', '后天', '大后天'],
        checkedList: ['今天', '明天'],
        indeterminate: true,
        checkAll: false,
      }
    },
    methods: {
      onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < this.items.length;
        this.checkAll = checkedList.length === this.items.length;
      },
    },
  }
</script>

<style lang="scss">
  .date-select{
    margin-left: 20px;
  }
</style>
