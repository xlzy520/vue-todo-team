<template>
    <div>
        <v-card style="width:37vw;min-height:70vh;margin: 20px">
            <v-card-title>
                 {{title}}
            </v-card-title>
            <v-card-text style="height: 75vh;overflow-y: scroll">
                <draggable
                        ghost-class="ghost"
                        v-model="todos" group="people" @start="drag=true" @end="drag=false">
                    <transition-group name="list">
                        <div v-for=" todo in todos" :key="todo.id"
                             style="cursor: default;border-bottom: 1px solid #ccc;margin-bottom: 10px">
                            <p style="display: flex;justify-content: space-between">
                                <span>{{todo.name}}</span>
                                <span>{{todo.date.toLocaleString()}}</span>
                            </p>
                            <p style="display: flex;justify-content: space-between">
                                <span>  {{todo.importance|ip}}</span>
                                <span>  {{todo.type}}</span>
                            </p>
                        </div>
                    </transition-group>
          </draggable>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components:{draggable},
        name: "TodoList",
        props: ['title','content'],
        data() {
            return {
                    todos: [],
                    type : ['生活','娱乐','reading','sports','life','food','music']
            }
        },
        filters: {
            ip: function (value) {
                const ips = [{v:0, l:'很重要'}, {v:1, l:'重要'}, {v:2, l:'普通'}, {v:3, l:'随意'},]
                return  ips.find(d=>d.v == value).l
            }
        },
        created() {
            for(let i = 0 ; i < 10;i++) {
                const todayTodo = {
                    id:Math.random(),
                    type: this.type[Math.floor(Math.random() * this.type.length)],
                    name: (Math.random() * 3000).toFixed(4),
                    importance: Math.round(Math.random() * 3),
                    date: new Date()
                }
                this.todos.push(todayTodo)
            }
        }
    }
</script>

<style>
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-enter-active, .list-leave-active {
        transition: all .3s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
