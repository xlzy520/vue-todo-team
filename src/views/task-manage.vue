<template>
  <div>
    <div class="header">
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
          <a-button @click="search()" icon="search" type="primary">搜索</a-button>
        </a-form-model-item>
      </a-form-model>

    </div>
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    >
     <span slot="action" slot-scope="text,record" class="action">
            <a @click="edit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
                title="确定删除该任务?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="removeTodo(record)"
            >
              <a>删除</a>
              </a-popconfirm>

        </span>
      <span slot="gender" slot-scope="text">
        {{text === 'male'? '男': '女'}}
      </span>
      <span slot="status" slot-scope="text">
        {{text? '已完成': '未完成'}}
      </span>
      <span slot="priority" slot-scope="text">
        {{ips[text]}}
      </span>
      <span slot="avatar" slot-scope="text">
        <img class="avatar" src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png">
      </span>
    </a-table>
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
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
  import userApi from "../api/user";
  import moment from "moment";
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import taskApi from "../api/task";


  export default {
    name: 'user-manage',
    data() {
      return {
        locale,
        loading: false,
        rules: {
          title: [
            this.$rules.required('待办事项名', 'change'),
          ],
          date: [
            this.$rules.required('结束时间', 'change'),
          ],
        },
        columns: [
          {title: '待办事项名', dataIndex: 'title', width: 180},
          // {title: '描述', dataIndex: 'desc',},
          {title: '重要程度', dataIndex: 'priority',scopedSlots: { customRender: 'priority' }},
          {title: '类型', dataIndex: 'tags',},
          {title: '状态', dataIndex: 'status',scopedSlots: { customRender: 'status' }},
          {title: '开始时间', dataIndex: 'createdAt',},
          {title: '结束时间', dataIndex: 'end',},
          {title: '创建者Id', dataIndex: 'userId',},
          {title: '操作', dataIndex: 'action',scopedSlots: { customRender: 'action' }},

        ],
        data: [],
        visible: false,
        confirmLoading: false,
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        editForm: {
          date: []
        },
        pagination: {
          current: 1
        },
        searchForm: {
          title: '',
          // priority: '',
          // tags: '',
          // status: ''
        },
        ips: ['', '紧急', '重要', '一般'],
        type: ['生活', '娱乐', 'reading', 'sports', 'life', 'food', 'music'],

      }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      edit (row){
        this.visible = true
        row.date = [moment(this.editForm.start).format('YYYY-MM-DD HH:mm'),
          moment(this.editForm.end).format('YYYY-MM-DD HH:mm')]
        this.editForm = {...row}

      },
      removeTodo(todo) {
        taskApi.delete({
          id: todo.id
        }).then(res=>{
          this.$msg('删除成功')
          this.fetch()
        })
      },
      handleUpdateTodo (){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            this.editForm.start = this.editForm.date[0]
            this.editForm.end = this.editForm.date[1]
            taskApi.update(this.editForm).then(res=>{
              this.$msg('更新成功')
              this.handleCancel()
              this.search()
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
          pageNo: this.pagination.current,
          isDeleted: false,
          ...params,
        }).then(data=>{
          const pagination = {...this.pagination};
          pagination.total = data.list.count;
          this.loading = false;
          this.data = data.list.rows;
          this.pagination = pagination;
        })
        //
        // v.startTime = moment(v.startTime).format('YYYY-MM-DD HH:mm')
        // v.endTime = moment(v.endTime).format('YYYY-MM-DD HH:mm')
      },
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const pager = {...this.pagination};
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          pageNo: pagination.current,
          ...filters,
        });
      },
      fetch(params = {}) {
        console.log('params:', params);
        this.loading = true;
        params.isDeleted = false;
        taskApi.search(params).then(data => {
          const pagination = {...this.pagination};
          pagination.total = data.list.count;
          this.loading = false;
          this.data = data.list.rows;
          this.pagination = pagination;
        });
      }
    }
  }
</script>

<style lang="scss">
  .action{
    color: #1296db;
  }
</style>
