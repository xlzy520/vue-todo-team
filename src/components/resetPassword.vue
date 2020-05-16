<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <div class="card-body p-lg-5">
                <h4 class="mb-1 text-center">重置密码</h4>
                <p class="mt-0 text-center">在ICO-清单中记录和规划大小事务、用更少的时间达成目标，从冗杂的待办事项中解脱出来。</p>
                <div class="reset-container">
                  <a-form-model ref="validateForm" :model="validateForm"
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                :rules="validateRules">
                    <a-form-model-item hasFeedback label="手机号" prop="phone">
                      <a-input v-model="validateForm.phone" type="phone" placeholder="手机号" >
                        <a-icon slot="prefix" type="phone" />
                      </a-input>
                    </a-form-model-item>
                    <a-form-model-item v-if="!question" :wrapper-col="{ span: 20, offset: 4 }">
                      <a-button :loading="loading" type="primary" @click="onSubmitPhone">重置密码</a-button>
                    </a-form-model-item>

                    <div v-if="question">
                      <a-form-model-item hasFeedback label="密保问题">
                        <span>{{question}} ?</span>
                      </a-form-model-item>
                      <a-form-model-item hasFeedback label="密保答案" prop="answer">
                        <a-input v-model="validateForm.answer" placeholder="密保答案" >
                          <a-icon slot="prefix" type="heart" />
                        </a-input>
                      </a-form-model-item>
                      <a-form-model-item hasFeedback label="新密码" prop="newPassword">
                        <a-input v-model="validateForm.newPassword" placeholder="新的密码,请不要忘记" >
                          <a-icon slot="prefix" type="lock" />
                        </a-input>
                      </a-form-model-item>
                      <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
                        <button type="submit" @click="onSubmit" class="btn btn-success btn-round btn-block btn-lg">确定</button>
                      </a-form-model-item>
                    </div>
                  </a-form-model>
                </div>
                <router-link to="/login" class="register-link">
                  <span class="nav-link-inner--text">登录? </span>
              </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import userApi from "../api/user";
export default {
  name: "Register",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      validateForm: {
        phone: '13588043792',
        answer: '',
        newPassword: ''
      },
      validateRules: {
        newPassword: [
          this.$rules.required('密码', 'change'),
          this.$rules.minMax(6, 20, '请输入6-20位密码', 'change'),
        ],
        answer: [
          this.$rules.required('密保答案', 'change'),
        ],
        phone: [
          this.$rules.required('手机号'),
          this.$rules.phone,
        ],
      },
      question: '',
      loading: false
    };
  },
  methods: {
    onSubmitPhone(){
      this.$refs.validateForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.fetchQuestion()
        }
      });
    },
    fetchQuestion(){
      userApi.getQuestion({
        phone: this.validateForm.phone
      }).then(res=>{
        this.question = res.question
      }).finally(() => {
        this.loading = false
      })
    },
    onSubmit() {
      this.$refs.validateForm.validate(valid => {
        if (valid) {
          userApi.resetPassword(this.validateForm).then(res=>{
            this.$message.success('重置密码成功')
            this.$router.push('/login')
          })
        }
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  /deep/ .ant-form-item{
    margin-bottom: 10px;
  }
section.main-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-link{
  float: right;
  margin-top: 15px;
}
</style>


