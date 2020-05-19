<template>
    <div>
        <div style="display: flex;
          flex-wrap: wrap;
">

<!--            dialog-->
            <v-dialog
                    v-model="dialog"
                    fullscreen
            >
                <template v-slot:activator="{ on }">
                        <span v-on="on">
                        <v-card hover class="todo-card" style="font-size: 40px;display: flex;justify-content: center;align-items: center;cursor: pointer">
                            ➕
                        </v-card>
                        </span>
                </template>

                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>添加新的TodoList集合</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="add">保存</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-list three-line subheader>
                        <v-subheader>基本信息</v-subheader>
                        <v-list-item>
                            <v-list-item-content>
                                <v-text-field
                                        v-model="list.name"
                                        :counter="10"
                                        label="名称"
                                        required
                                ></v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                               <v-select :items="type" label="类型">

                               </v-select>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader>
                        <v-subheader>额外设置</v-subheader>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>是否显示在主页</v-list-item-title>
                                <v-list-item-subtitle>你可以在主页查看改集合</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Sound</v-list-item-title>
                                <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Auto-add widgets</v-list-item-title>
                                <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-dialog>
<!--            end dialog-->

            <v-card hover class="todo-card" @click="detailDialog = true" v-for="list in lists" :key="list">
                    <v-card-title>{{list}}</v-card-title>
            </v-card>


<!--    detail dialog        -->
            <v-dialog
                    v-model="detailDialog"
                    width="900"
            >
                <v-card>
                    <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                    >
                        备忘录集合
                    </v-card-title>

                    <v-card-text>

                        <div style="height: 60vh;overflow-y: scroll;padding:10px">

                            <transition-group name="list">
                                <div class="todo" :class="{success:todo.complete}"  @click="todoDetail(todo)" v-for=" todo in todos" :key="todo.id" style="cursor: default;border-bottom: 1px solid #ccc;margin-bottom: 10px">
                                    <p style="display: flex;justify-content: space-between">
                                        <span>{{todo.name}}</span>
                                        <span>{{todo.date.toLocaleString()}}</span>
                                    </p>
                                    <p style="display: flex;justify-content: space-between">
                                        <span>  {{todo.importance|ip}}</span>
                                        <span>  {{todo.type}}</span>
                                    </p>
                                    <p class="text-right"  v-if="todo.id == activeTodo">
                                        <v-btn v-if="todo.complete" color="warning" small @click="uncomplete(todo)" style="margin-right: 9px">撤销🐷</v-btn>
                                        <v-btn v-if="!todo.complete" color="success" small @click="complete(todo)" style="margin-right: 9px">完成√</v-btn>
                                        <v-btn  color="error" small @click="remove(todo)">删除📌</v-btn>
                                    </p>
                                </div>

                            </transition-group>

                        </div>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                text
                                @click="detailDialog = false"
                        >
                            关闭
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

<!--  end  detail dialog        -->

        </div>
    </div>
</template>

<script>
    export default {
        name: "todoListManage",

        data() {
            return {
                dialog:false,
                detailDialog:false,
                lists: ['旺仔牛奶','美的孔代哦'],
                list:{

                },
                activeTodo:null,
                todos: [],
                type : ['生活','娱乐','reading','sports','life','food','music']
            }
        },
        methods: {
            uncomplete(d){
                d.complete = false
                const  index = this.todos.indexOf(d)
                this.todos.splice(index,1,d)
                this.sort()
            },
            complete(d){
                d.complete = true
                const  index = this.todos.indexOf(d)
                this.todos.splice(index,1,d)
                this.sort()
            },
            sort(){
              this.todos.sort((a,b)=>{
                  if(a.complete) return 1
              })
            },
            remove(d){
                this.$swal.fire({
                    title: '删除此todo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: '取消',
                    confirmButtonText: '确定'
                }).then((result) => {
                    this.todos = this.todos.filter(x=>x.id != d.id)
                })
            },
            todoDetail(d){
               this.activeTodo = d.id
            },
            add() {
                    this.lists.push(this.list.name)
                    this.dialog = false
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
