<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5">
              <img src="/img/ill-2.svg" class="img-center img-fluid" />
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <a-spin :spinning="loading">
                <div class="card-body p-lg-5" >
                  <h4 class="mb-1 text-center">{{title}}</h4>
                  <p class="mt-0 text-center">在ICO-清单中记录和规划大小事务、用更少的时间达成目标，从冗杂的待办事项中解脱出来。</p>
                  <div class="form-group mt-5">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-user-run"></i>
                      </span>
                      </div>
                      <input
                          class="form-control"
                          placeholder="手机号"
                          name="username"
                          v-model="userDetails.phone"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-lock-circle-open"></i>
                      </span>
                      </div>
                      <input
                          class="form-control"
                          placeholder="密码"
                          name="password"
                          type="password"
                          v-model="userDetails.password"
                      />
                    </div>
                  </div>
                  <div>
                    <button :loading="loading" type="submit" class="btn btn-success btn-round btn-block btn-lg" @click="login">登录</button>
                    <!--                  <p class="text-center my-2">OR</p>-->
                    <div class="row d-flex align-items-center">
                      <!--                    <div class="col-md-6">-->
                      <!--                      <a @click="googleLogin" class="google-img-wrapper">-->
                      <!--                        <img-->
                      <!--                          src="/img/google-signin.png"-->
                      <!--                          class="google-signin-img img-fluid"-->
                      <!--                        />-->
                      <!--                      </a>-->
                      <!--                    </div>-->
                      <div class="col-md-12 mt-2 login-footer">
                        <router-link to="/resetPassword" class="login-footer-link">
                          <span class="nav-link-inner--text">忘记密码?</span>
                        </router-link>
                        <router-link to="/register" class="login-footer-link">
                          <span class="nav-link-inner--text">注册?</span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

              </a-spin>
            </div>
          </div>
        </div>
      </div>
    </section>
    <notifications group="foo" position="top right" class="my-style" width="400" />
  </div>
</template>



<script>
import VueRouter from "vue-router";
// import firebase from "firebase";
import todoDetailModal from "./TodoDetailModal";
import { Bus } from "./utils/bus";
import user from "../api/user";
import vueStore from "../store";
import { mapActions, mapGetters } from "vuex";
import baseRequest, {setFetchDefaultHeader} from "../utils/baseRequest";

export default {
  name: "Login",
  data: function() {
    return {
      title: "登录",
      userDetails: {
        phone: '13588043792',
        password: '123456'
      },
      loading: false
    };
  },
  methods: {
    ...mapActions(["saveUserData"]),
    login() {
      this.loading = true
      user.login(this.userDetails).then(res=>{
        console.log(res);
        // localStorage.setItem('token', res.token)
        // baseRequest.defaults.headers['authorization'] = 'Bearer ' + res.token
        setFetchDefaultHeader(res.token)
        this.$store.dispatch('saveUserData', res)
        this.$router.push('todo');
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false
      })
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(
      //     user => {
      //       console.log(user);
      //       this.saveUserData({uid:user.uid, name:user.displayName, email:user.email,displayImage:user.photoURL})
      //
      //       this.$router.replace("todo");
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   );
      //   let login = () => {
      //     let data = {
      //       email: email,
      //       password: password
      //     };
      //     axios
      //       .post("/api/login", data)
      //       .then(response => {
      //         console.log("Logged in", response);
      //         this.$router.push("/home");
      //       })
      //       .catch(errors => {
      //         console.log("Cannots login", errors);
      //       });
      //   };
    },
    showNotification(msg, alertType) {
      this.$notify({
        group: "foo",
        text: `<div class="alert ${alertType}" role="alert">${msg}</div> `,
        position: "top left",
        duration: 10000
      });
    },
    sendDataToStore(user) {
      let data = {
        uid:user.uid,
        name:user.displayName,
        profileImage:user.photoURL,
        email:user.email
      }
      vueStore
        .dispatch("saveUserData", data)
        .then(something => {
          console.log("done");
        })
        .catch(error => {
          console.log("err");
        });
    },
    googleLogin() {
      let that = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          that.$notify({
            group: "foo",
            text: `<div class="alert alert-success" role="alert">
                            <p> Welcome ${user.displayName}</p>
                    You are logged in as ${user.email}
                </div> `,

            position: "top left",
            duration: 10000
          });
          that.sendDataToStore(user);
          that.$router.replace("todo");
          // ...
        })
        .catch(function(error) {
          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          that.showNotification(errorMessage, "alert-danger");
        });
    }
  }
};
</script>

<style scoped lang="scss">
section.main-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section {
  padding-top: 0;
}
 .login-footer{
   display: flex;
   justify-content: space-between;
 }
</style>


