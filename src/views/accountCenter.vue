<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24" class="info-content">
      <a-col :md="24" :lg="24">
        <a-card :bordered="false">
<!--          <div class="account-center-avatarHolder">-->
<!--            <div class="avatar">-->
<!--              <img src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png">-->
<!--            </div>-->
<!--            <div class="username">{{ userInfo.name}}</div>-->
<!--            <div class="bio">海纳百川，有容乃大</div>-->
<!--          </div>-->
          <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol"
                        :rules="rules">
            <a-form-model-item hasFeedback label="头像" prop="avatar">
              <a-upload
                  name="file"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="/user/upload"
                  @change="handleChange"
              >
                <img v-if="form.avatar" :src="form.avatar" alt="avatar" />
                <div v-else>
                  <div class="ant-upload-text">
                    上传头像
                  </div>
                </div>
              </a-upload>
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
            <a-form-model-item hasFeedback label="姓名" prop="name">
              <a-input v-model="form.name" placeholder="姓名" >
                <a-icon slot="prefix" type="idcard" />
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
            <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
              <button type="submit" @click="onSubmit" class="btn btn-success btn-round btn-block btn-lg">修改</button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  // import { PageView, RouteView } from '@/layouts'
  // import { AppPage, ArticlePage, ProjectPage } from './page'
  import userApi from "../api/user";
  import teamApi from "../api/team";

  export default {
    name: 'accountCenter',
    data () {
      return {
        tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
        tagInputVisible: false,
        tagInputValue: '',
        teams: [],
        teamSpinning: true,
        userInfo: {},
        imageUrl: 'https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png',
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
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
      }
    },
    mounted () {
      this.getTeams()
      this.getUserInfo()
    },
    methods: {
      handleChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.form.avatar = info.file.response.data.url;
          this.loading = false;
        }
      },
      getUserInfo(){
        userApi.getInfo().then(res=>{
          this.form = res
        })
      },
      getTeams () {
        teamApi.myTeams().then(res=>{
          this.teams = res.list || []
          this.teamSpinning = false
        })
      },
      onSubmit(){
        userApi.update(this.form).then(res=>{
          this.$msg('更新信息成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-header-wrapper-grid-content-main {
    width: 100%;
    height: 100%;
    min-height: 100%;
    transition: 0.3s;
    .account-center-avatarHolder {
      text-align: center;
      margin-bottom: 24px;
      & > .avatar {
        margin: 0 auto;
        width: 104px;
        height: 104px;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .username {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 4px;
      }
    }
    .account-center-detail {
      p {
        margin-bottom: 8px;
        padding-left: 26px;
        position: relative;
      }
      i {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 0;
        top: 4px;
        background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
      }
      .title {
        background-position: 0 0;
      }
      .group {
        background-position: 0 -22px;
      }
      .address {
        background-position: 0 -44px;
      }
    }
    .account-center-tags {
      .ant-tag {
        margin-bottom: 8px;
      }
    }
    .account-center-team {
      .members {
        a {
          display: block;
          margin: 12px 0;
          line-height: 24px;
          height: 24px;
          .member {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 24px;
            max-width: 100px;
            vertical-align: top;
            margin-left: 12px;
            transition: all 0.3s;
            display: inline-block;
          }
          &:hover {
            span {
              color: #1890ff;
            }
          }
        }
      }
    }
    .tagsTitle,
    .teamTitle {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
  }
  .info-content{
    display: flex;
    justify-content: center;
  }
</style>
