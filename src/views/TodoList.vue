<template>
  <div>
    <v-card style="width:37vw;min-height:70vh;margin: 20px">
      <v-card-title class="justify-center">
        {{title.label}}
      </v-card-title>
      <div class="add-todo">
        <a-input-group compact>
          <a-input style="width: 57%" @keydown.enter="addTodo" v-model="form.title" placeholder="输入新的代办事项"/>
          <a-select v-model="form.tags" style="width: 20%">
            <a-select-option :value="typeItem" v-for="typeItem in type" :key="typeItem">{{typeItem}}</a-select-option>
          </a-select>
          <a-select v-model="form.priority" style="width: 21%">
            <a-select-option value="1">紧急任务</a-select-option>
            <a-select-option value="2">重要任务</a-select-option>
            <a-select-option value="3">一般任务</a-select-option>
          </a-select>
        </a-input-group>
        <a-button type="primary" @click="addTodo">添加</a-button>
      </div>
      <v-card-text style="height: 75vh;overflow-y: scroll">
        <draggable
            ghost-class="ghost"
            v-model="todoList" group="people" @start="drag=true" @end="drag=false"
            @change="dragChange">
          <transition-group name="list" v-if="todoList">
            <div v-for=" todo in todoList" :key="todo.id" class="todo-item"
                 @dblclick="completeTodo(todo)"
                 :class="[priorityClass[todo.priority], todo.status ? 'completed': '' ]">
              <a-tooltip :title="todo.title">
                <span>{{todo.title}}</span>
              </a-tooltip>
              <span>{{todo.start}}</span>
              <a-tag :color="priorityTagClass[todo.priority]">
                <span>{{todo.priority|priority}}</span>
              </a-tag>
              <span>{{todo.tags || '暂无分类'}}</span>
              <span class="todo-item-action" @click="edit(todo)"><a-icon type="edit" /></span>
              <a-popconfirm
                  title="确定删除该待办事项?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="removeTodo(todo)"
              >
                 <span class="todo-item-action">
                   <a-icon type="delete" />
                 </span>
              </a-popconfirm>
            </div>
            <div v-if="!todoList.length" key="empty" class="empty-todo-list"></div>

          </transition-group>
        </draggable>

      </v-card-text>
    </v-card>
    <a-modal
        title="编辑代办事项"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleUpdateTodo"
        @cancel="handleCancel"
        ok-text="确认" cancel-text="取消"
    >
      <a-form-model ref="ruleForm" :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol"
                    :rules="rules">
        <a-form-model-item label="待办事项名" prop="title">
          <a-input v-model="editForm.title" placeholder="待办事项名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="类型" prop="tags">
          <a-select v-model="editForm.tags">
            <a-select-option :value="typeItem" v-for="typeItem in type" :key="typeItem">
              {{typeItem}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="重要程度" prop="priority">
          <a-select v-model="editForm.priority">
            <a-select-option value="1">紧急任务</a-select-option>
            <a-select-option value="2">重要任务</a-select-option>
            <a-select-option value="3">一般任务</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="是否完成" prop="status">
          <a-switch v-model="editForm.status" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import moment from "moment";
  import taskApi from "../api/task";
  import teamApi from "../api/team";

  export default {
    components: {draggable},
    name: "TodoList",
    props: ['title', 'content', 'index', 'todos'],
    data() {
      return {
        // todoList: [],
        type: ['生活', '娱乐', 'reading', 'sports', 'life', 'food', 'music'],
        priorityClass: ['', 'high', 'medium', 'low'],
        priorityTagClass: ['', '#f50', 'orange', 'blue'],
        form: {
          priority: '3',
          title: '',
          tags: '生活'
        },
        ss: this.todos,
        visible: false,
        confirmLoading: false,
        editForm: {},
        rules: {
          title: [
            this.$rules.required('待办事项名', 'change'),
          ],
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },

      }
    },
    computed: {
      todoList: {
        get(){
          return this.todos || []
        },
        set(val){
          this.$emit('updateTodo', {
            index: this.index,
            val
          })
          // this.todoList = val
          console.log(val);
        }

      }
    },
    methods: {
      edit (row){
        this.visible = true
        this.editForm = {...row}
      },
      handleUpdateTodo (){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            taskApi.update(this.editForm).then(res=>{
              this.$msg('更新成功')
              this.handleCancel()
              this.fetchTodoList()
            }).finally(() => {
              this.confirmLoading = false;
            })
          }
        });
      },
      handleCancel (){
        this.visible = false
        this.editForm = {}
      },
      dragChange(a,b,c,d){
        if (a.added) {
          const todo = a.added.element
          if (this.index) {
            todo.start = moment(todo.start).add(1, "day").format('YYYY-MM-DD')
          } else {
            todo.start = moment(todo.start).subtract(1, "day").format('YYYY-MM-DD')
          }
          this.updateTodo(todo)
        } else {
          // const todo = a.removed.element
          // if (this.index) {
          //   todo.start = moment(todo.start).subtract(1, "day").format('YYYY-MM-DD')
          // } else {
          //   todo.start = moment(todo.start).add(1, "day").format('YYYY-MM-DD')
          // }
          // this.updateTodo(todo)
        }
        console.log(a, b, c, d);
      },
      fetchTodoList(){
        this.$emit('fetchTodoList')
      },
      updateTodo(todo){
        taskApi.update(todo || this.editForm).then(res=>{
          this.$msg('更新待办事项成功')
          this.$emit('fetchTodoList');
        })
      },
      removeTodo(todo) {
        taskApi.delete({
          id: todo.id
        }).then(res=>{
          this.$msg('删除成功')
          this.fetchTodoList()
        })
      },
      completeTodo(todo) {
        todo.status = !todo.status
        taskApi.update(todo).then(res => {
          this.$msg('待办事项更新成功')
          this.fetchTodoList()
        })
      },
      addTodo() {
        if (this.form.title.length > 0) {
          this.form.start = moment().add(this.index, 'day').format('YYYY-MM-DD')
          taskApi.add(this.form).then(res=>{
            this.$msg('新增待办事项成功')
            this.fetchTodoList()
            this.resetAddTodo()
          })
        } else {
          this.$msg('请输入待办事项', 'error')
        }
      },
      resetAddTodo(){
        this.form.title = "";
        this.form.priority = '3'
      }
    },
    filters: {
      priority: function (value) {
        const ips = [{v: '1', l: '紧急'}, {v: '2', l: '重要'}, {v: '3', l: '一般'},]
        return ips.find(d => d.v === value).l
      }
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .todo-item{
    display: flex;
    cursor: default;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 3px;
    color: #fff;
    &.low{
      background-image: linear-gradient(to right, #4facfe 0%, #19c3cb 100%);
    }
    &.high{
      background-image: linear-gradient(to right, #ff001c 0%, #ff867a 0%, #ff001c 21%, #f99185 52%, #cf556c 78%, #ff001c 100%);
    }
    &.medium{
      background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    }
    &.completed{
      text-decoration:line-through;
      background-color: grey;
      background-image: none;
      &:after{
        content: " ";
        width: 90%;
        height: 2px;
        background: #fff;
        position: absolute;
        transform: translateY(12px);
      }
    }

    span+span{
      margin-left: 10px;
    }
    span:nth-child(1){
      flex: 1 1 180px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    span:nth-child(2){
      flex: 1 1 100px;
    }
    span:nth-child(3){
      flex: 0 0 40px;
    }
    span:nth-child(4){
      flex: 1 0 80px;
    }
    span:nth-child(5){
      flex: 0 0 auto;
    }
    span:nth-child(6){
      flex: 0 0 auto;
    }
    .todo-item-action{
      display: none;
      cursor: pointer;
      color: #111;
      &:hover{
        color: #fff;
      }
    }
    &:hover{
      .todo-item-action{
        display: block;
      }
    }
    p{
      display: flex;
      justify-content: space-between;
    }
  }
  .empty-todo-list{
    height: 200px;
    width: 100%;
  }
  .add-todo {
    display: flex;
    margin: 10px;

  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
