<template>
  <div>
    <div class="header">
      <a-form-model layout="inline" ref="searchForm" :model="searchForm">
        <a-form-model-item label="姓名" prop="name">
          <a-input v-model="searchForm.name" placeholder="姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="name">
          <a-input v-model="searchForm.phone" placeholder="手机号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="name">
          <a-input v-model="searchForm.email" placeholder="邮箱"></a-input>
        </a-form-model-item>

        <a-form-model-item label="性别" prop="priority">
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
                              title="确定删除该用户?"
                              ok-text="确定"
                              cancel-text="取消"
                              @confirm="deleteUser(record)"
                          >
                            <a>删除</a>
              </a-popconfirm>

        </span>
      <span slot="gender" slot-scope="text">
        {{text === 'male'? '男': '女'}}
      </span>
      <span slot="avatar" slot-scope="text">
        <img class="avatar" src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png">
      </span>
    </a-table>
    <a-modal
        title="编辑用户信息"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleUpdate"
        @cancel="handleCancel"
        ok-text="确认" cancel-text="取消"
    >
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item hasFeedback label="姓名" prop="name">
          <a-input v-model="form.name" placeholder="姓名" >
            <a-icon slot="prefix" type="idcard" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item hasFeedback label="手机号" prop="phone">
          <a-input v-model="form.phone" type="phone" placeholder="手机号" >
            <a-icon slot="prefix" type="phone" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item hasFeedback label="邮箱" prop="email">
          <a-input v-model="form.email" type="mail" placeholder="邮箱" >
            <a-icon slot="prefix" type="mail" />
          </a-input>
        </a-form-model-item>

        <a-form-model-item hasFeedback label="性别" prop="gender">
          <a-select v-model="form.gender" placeholder="请选择性别">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item hasFeedback label="年龄" prop="age">
          <a-input v-model="form.age" placeholder="年龄" >
            <a-icon slot="prefix" type="calendar" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item hasFeedback label="特长" prop="skill">
          <a-select v-model="form.skill" mode="tags" placeholder="可以自定义输入特长，按回车">
            <a-select-option value="篮球">
              篮球
            </a-select-option>
            <a-select-option value="游泳">
              游泳
            </a-select-option>
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
import teamApi from "../api/team";


export default {
  name: 'user-manage',
  data() {
    return {
      locale,
      loading: false,
      columns: [
        {title: '姓名', dataIndex: 'name',},
        {title: '手机号', dataIndex: 'phone',},
        {title: '邮箱', dataIndex: 'email',},
        {title: '年龄', dataIndex: 'age',},
        {title: '技能', dataIndex: 'skill',},
        {title: '性别', dataIndex: 'gender',scopedSlots: { customRender: 'gender' }},
        {title: '头像', dataIndex: 'avatar',scopedSlots: { customRender: 'avatar' }},
        {title: '操作', dataIndex: 'action',scopedSlots: { customRender: 'action' }},

      ],
      data: [],
      pagination: {},
      searchForm: {
        // title: '',
        // priority: '',
        // tags: '',
        // status: ''
      },
      type: ['生活', '娱乐', 'reading', 'sports', 'life', 'food', 'music'],
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        name: '',
        gender: 'male'
      },
      rules: {
        password: [
          this.$rules.required('密码', 'change'),
          this.$rules.minMax(6, 20, '请输入6-20位密码', 'change'),
        ],
        question: [
          this.$rules.required('密保问题', 'change'),
        ],
        answer: [
          this.$rules.required('密保答案', 'change'),
        ],
        email: [
          this.$rules.required('邮箱'),
          this.$rules.email
        ],
        phone: [
          this.$rules.required('手机号'),
          this.$rules.phone,
        ],
        name: [
          this.$rules.required('姓名'),
          this.$rules.chinese,
        ],
        age: [
          this.$rules.required('年龄'),
          this.$rules.number,
        ],
        skill: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一项特长',
            trigger: 'change',
          },
        ],
      },
      visible: false,
      confirmLoading: false,
      editForm: {},
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    handleUpdate() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          if (this.form.skill && Array.isArray(this.form.skill)) {
            this.form.skill = this.form.skill.join(',')
          }
          // this.form.startTime = this.form.date[0]
          // this.form.endTime = this.form.date[1]
          userApi.update(this.form).then(res=>{
            this.$msg('更新用户信息成功')
            this.search()
            this.handleCancel()
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.form = {}
    },
    deleteUser(row){
      userApi.delete({
        phone: row.phone
      }).then(res=>{
        this.$msg('删除成功')
        this.fetch()
      })

    },
    edit(row){
      this.visible = true
      if (row.skill && !Array.isArray(row.skill)) {
        row.skill = row.skill.split(',')
      }
      this.form = {...row}
    },
    search(){
      userApi.adminList({
        ...this.searchForm,
        ...this.page,
      }).then(data=>{
        const pagination = {...this.pagination};
        pagination.total = data.count;
        this.loading = false;
        this.data = data.rows;
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
      userApi.adminList(params).then(data => {
        const pagination = {...this.pagination};
        pagination.total = data.count;
        this.loading = false;
        this.data = data.rows;
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
