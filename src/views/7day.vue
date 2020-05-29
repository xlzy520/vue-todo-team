<template>
  <div>
    <add-button @add="add" v-if="title == '全部任务'"></add-button>
    <v-card style="min-height:70vh;margin: 20px">
      <v-card-title class="justify-center">
        {{title}}
      </v-card-title>
      <div class="header" v-if="$route.query.filter">
        <a-form-model layout="inline" ref="searchForm" :model="searchForm">
          <a-form-model-item label="待办事项名" prop="title">
            <a-input v-model="searchForm.title" placeholder="待办事项名"></a-input>
          </a-form-model-item>
          <a-form-model-item label="类型" prop="tags">
            <a-select v-model="searchForm.tags" style="width: 160px" allowClear>
              <a-select-option :value="typeItem" v-for="typeItem in type" :key="typeItem">
                {{typeItem}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="起止日期" prop="date" allowClear>
            <a-range-picker
                :locale="locale"
                v-model="searchForm.date"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>

          <a-form-model-item label="重要程度" prop="priority">
            <a-select v-model="searchForm.priority" style="width: 160px" allowClear>
              <a-select-option value="1">紧急任务</a-select-option>
              <a-select-option value="2">重要任务</a-select-option>
              <a-select-option value="3">一般任务</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="状态" prop="priority">
            <a-select v-model="searchForm.status" style="width: 160px" allowClear>
              <a-select-option :value="false">未完成</a-select-option>
              <a-select-option :value="true">已完成</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item>
            <a-button @click="search" icon="search" type="primary">搜索</a-button>
          </a-form-model-item>
        </a-form-model>

      </div>

      <v-card-text style="height: 75vh;overflow-y: scroll">
        <draggable
            ghost-class="ghost"
            v-model="todoList" group="people" @start="drag=true" @end="drag=false">
          <transition-group name="list" v-if="todoList">
            <div v-for=" todo in todoList" :key="todo.id" class="todo-item"
                 @dblclick="completeTodo(todo)"
                 :class="[priorityClass[todo.priority], todo.status ? 'completed': '' ]">
              <a-tooltip :title="todo.title">
                <span>{{todo.title}}</span>
              </a-tooltip>
              <span>{{handleDate(todo.start)}}</span>
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
                 <span class="todo-item-action" v-if="!isTrash">
                   <a-icon type="delete" />
                 </span>
              </a-popconfirm>
              <a-popconfirm
                  title="确定还原该待办事项?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="recycleTodo(todo)"
              >
                 <span class="todo-item-action">
                   <a-icon type="undo" />
                 </span>
              </a-popconfirm>
            </div>
          </transition-group>
        </draggable>
        <a-pagination v-model="page.pageNo" :total="count" @change="onPageChange" show-less-items />
      </v-card-text>
    </v-card>
    <a-modal
        :title="(isAdd? '新增':'编辑')+'代办事项'"
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
        <a-form-model-item label="起止时间" prop="date">
          <a-range-picker
              :locale="locale"
              v-model="editForm.date"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              valueFormat="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
          />
        </a-form-model-item>

        <a-form-model-item label="重要程度" prop="priority">
          <a-select v-model="editForm.priority">
            <a-select-option value="1">紧急任务</a-select-option>
            <a-select-option value="2">重要任务</a-select-option>
            <a-select-option value="3">一般任务</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="是否完成" prop="status" v-if="!isAdd">
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
  import AddButton from "../components/AddButton";

  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

  export default {
    components: {draggable, AddButton},
    name: "TodoList",
    props: ['title', 'content', 'index', 'todos'],
    data() {
      return {
        locale,
        todoList: [],
        type: ['生活', '娱乐', 'reading', 'sports', 'life', 'food', 'music'],
        priorityClass: ['', 'high', 'medium', 'low'],
        priorityTagClass: ['', '#f50', 'orange', 'blue'],
        form: {
          priority: '3',
          title: '',
          tags: '生活'
        },
        searchForm: {
          title: '',
          // priority: '',
          // tags: '',
          // status: ''
        },
        visible: false,
        confirmLoading: false,
        editForm: {},
        rules: {
          title: [
            this.$rules.required('待办事项名', 'change'),
          ],
          date: [
            this.$rules.required('结束时间', 'change'),
          ],
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        params: {},
        page: {
          pageNo: 1,
          pageSize: 10
        },
        count: 0,
        isAdd: false
      }
    },
    computed: {
      title() {
        const titles = {
          'delete': '垃圾桶',
          'all': '全部任务',
        }
        return titles[this.$route.query.filter] || '最近七天'
      },
      isTrash(){
        return this.$route.query.filter === 'delete'
      }
    },
    methods: {
      add(){
        this.visible = true
        this.isAdd = true
        this.editForm = {
          tags: '生活',
          priority: '1'
        }
      },
      search(){
        const { date, ...rest } = this.searchForm

        let params = {
          ...rest
        }
        if (date) {
          params = {...params, ...{
              start: date[0] + ' 00:00:00',
              end: date[1] + ' 23:59:59'
            }}
        }
        taskApi.search({
          ...params,
          ...this.page,
          isDeleted: this.isTrash
        }).then(res=>{
          this.todoList = res.list.rows
          this.count = res.list.count
          console.log(res);
        })
        //
        // v.startTime = moment(v.startTime).format('YYYY-MM-DD HH:mm')
        // v.endTime = moment(v.endTime).format('YYYY-MM-DD HH:mm')
      },
      onPageChange (cur){
        this.page.pageNo = cur
        this.search()
      },
      edit (row){
        this.visible = true
        this.editForm = {...row}
      },
      handleUpdateTodo (){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            this.editForm.startTime = this.editForm.date[0]
            this.editForm.endTime = this.editForm.date[1]
            const service = this.isAdd? taskApi.add: taskApi.update
            service(this.editForm).then(res=>{
              this.$msg('更新成功')
              this.handleCancel()
              this.refresh()
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
      handleDate(str){
        console.log(str);
        return str.substr(0, 11)
      },
      fetchTodoList(){
        taskApi.get7Day().then(res=>{
          this.todoList = res.list || []
        })
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
          this.refresh()
        })
      },
      completeTodo(todo) {
        todo.status = !todo.status
        taskApi.update(todo).then(res => {
          this.$msg('待办事项更新成功')
          this.refresh()
        })
      },
      recycleTodo(todo){
        todo.isDeleted = !todo.isDeleted
        taskApi.update(todo).then(res => {
          this.$msg('待办事项还原成功')
          this.refresh()
        })
      },
      addTodo() {
        if (this.form.title.length > 0) {
          this.form.start = moment().add(this.index, 'day').format('YYYY-MM-DD')
          taskApi.add(this.form).then(res=>{
            this.$msg('新增待办事项成功')
            this.refresh()
            this.resetAddTodo()
          })
        } else {
          this.$msg('请输入待办事项', 'error')
        }
      },
      resetAddTodo(){
        this.form.title = "";
        this.form.priority = '3'
      },
      refresh(){
        if (this.params.filter) {
          this.search()
        } else {
          this.fetchTodoList()
        }
      }
    },
    filters: {
      priority: function (value) {
        const ips = [{v: '1', l: '紧急'}, {v: '2', l: '重要'}, {v: '3', l: '一般'},]
        return ips.find(d => d.v === value).l
      }
    },
    created() {
      this.params = this.$route.query
      this.refresh()
    },
    watch: {
      $route(a, b){
        if (a.params !== b.params) {
          this.refresh()
        }
      }
    },
  }
</script>

<style lang="scss">
  .date-select{
    margin-left: 20px;
  }
  .header{
    padding: 10px 20px;
  }
</style>
