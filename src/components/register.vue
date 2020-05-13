<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <div class="card-body p-lg-5">
                <h4 class="mb-1 text-center">注册</h4>
                <p class="mt-0 text-center">来访问这个最酷与最棒的项目。</p>
                <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                  <a-form-model-item hasFeedback label="用户名" prop="username">
                    <a-input v-model="form.username" placeholder="用户名" >
                      <a-icon slot="prefix" type="user" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="密码" prop="password">
                    <a-input v-model="form.password" type="password" placeholder="密码">
                      <a-icon slot="prefix" type="lock" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="密保问题" prop="question">
                    <a-input v-model="form.question" placeholder="用于忘记密码时使用" >
                      <a-icon slot="prefix" type="question-circle" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="密保答案" prop="answer">
                    <a-input v-model="form.answer" placeholder="请不要忘记答案哦" >
                      <a-icon slot="prefix" type="heart" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="邮箱" prop="email">
                    <a-input v-model="form.email" type="mail" placeholder="邮箱" >
                      <a-icon slot="prefix" type="mail" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="手机号" prop="phone">
                    <a-input v-model="form.phone" type="phone" placeholder="手机号" >
                      <a-icon slot="prefix" type="phone" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="姓名" prop="name">
                    <a-input v-model="form.name" placeholder="姓名" >
                      <a-icon slot="prefix" type="name" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="性别" prop="gender">
                    <a-select v-model="form.gender" placeholder="请选择性别">
                      <a-select-option value="male">男</a-select-option>
                      <a-select-option value="female">女</a-select-option>
                    </a-select>
<!--                    <a-input v-model="form.gender" type="phone" placeholder="性别" >-->
<!--                      <a-icon slot="prefix" type="gender" />-->
<!--                    </a-input>-->
                  </a-form-model-item>
                  <a-form-model-item hasFeedback label="年龄" prop="age">
                    <a-input v-model="form.age" placeholder="年龄" >
                      <a-icon slot="prefix" type="age" />
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
                  <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
                    <button type="submit" @click="onSubmit" class="btn btn-success btn-round btn-block btn-lg">注册</button>
                  </a-form-model-item>
                </a-form-model>
                <router-link to="/login" class="register-link">
                  <span class="nav-link-inner--text">已经注册? </span>
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
      form: {
        name: '',
        gender: 'male'
      },
      rules: {
        username: [
          this.$rules.required('用户名', 'change'),
          this.$rules.minMax(1, 20, '请输入1-20位用户名', 'change'),
        ],
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
    };
  },
  methods: {
    onSubmit() {
      localStorage.setItem('register', JSON.stringify(this.form))
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          userApi.register(this.form).then(res=>{
            this.$message.success('注册成功')
            this.$router.push('/todo')
            this.$store.dispatch('getInfo')
            // localStorage.removeItem('register')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
  },
  mounted() {
    // 注册时记忆用户输入的信息，避免意外需要重新输入
    const register = JSON.parse(localStorage.getItem('register'))
    this.form = register || {
      gender: 'male'
    }
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


