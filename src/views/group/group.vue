<template>
    <div style="display: flex;flex-wrap: wrap">
        <v-card hover class="todo-card" style="font-size: 40px;display: flex;justify-content: center;align-items: center;cursor: pointer">
            🔍
        </v-card>
        <v-card to="group/2" hover class="todo-card" @click="detailDialog = true" v-for="list in lists" :key="list">
            <v-card-title>{{list}}</v-card-title>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "group",
        data() {
            return {
                lists: ['旺仔牛奶','美的孔代哦'],
            }
        },
    }
</script>

<style>
  .complete{
    background: lightgreen;
  }
  .todo{
    transition: all .3s;
    padding: 10px;
  }
  .todo:hover{
    background: rgba(180, 209, 220, 0.65);
  }
  .todo-card{
    width: 250px;
    height: 250px;
    margin-right: 30px;
    margin-top: 30px;
  }
</style>
