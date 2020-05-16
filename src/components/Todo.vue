<template>
  <div class="main-wrapper">
    <section class="section pb-0 main-section bg-gradient-info">
      <navbar />
      <main class="container card shadow shadow-lg--hover mt-3" id="todolist">
        <div class="row mb-3">
          <div class="col-6">
            <h1>待办事项</h1>
            <p>{{userData.name}}</p>
          </div>
          <div class="col-6 text-right">
            <div class="user-icon">
              <a-dropdown :trigger="['click']">
                <img
                    src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-toggle img-fluid"
                />
                <a-menu slot="overlay">

                  <a-menu-item @click="toggleFullScreen">
                    <a-icon :type="isFullScreen?'fullscreen': 'fullscreen-exit'" />
                    <span>{{ isFullScreen ? '退出全屏' : '进入全屏'}}</span>
<!--                    <a class="dropdown-item" href="#" @click="toggleFullScreen"></a>-->
                  </a-menu-item>
                  <a-menu-item @click="logout">
                    <a-icon type="logout" />
                    <span>退出登录</span>

                    <!--                    <a href="#" @click="logout"></a>-->
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
<!--              <div class="dropdown">-->
<!--               -->
<!--                 -->
<!--                </div>-->
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col-4">
            <span class="badge badge-primary">总共 : {{todos.length || 0}}</span>
          </div>
          <div class="col-4">
            <span class="badge badge-success">完成 : {{completedTodos.length || 0}}</span>
          </div>
          <div class="col-4">
            <span class="badge badge-warning">进行中 : {{pendingTodos.length || 0}}</span>
          </div>
          <div class="col-md-12 mt-3">
            <div class="form-group">
              <input
                type="text"
                name="newTodo"
                class="add-todo-field form-control"
                placeholder="输入新的代办事项"
                @keydown.enter="addnewTodo($event)"
                autocomplete="off"
                v-model.trim="newTodoText"
              />
              <i
                class="fa fa-arrow-right submit-icon"
                @click="addnewTodo($event)"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>

        <ul id="todo-list">
          <VuePerfectScrollbar class="scroll-area">
            <draggable handle=".handle-wrapper" ghost-class="ghost" :list="getTodos">
              <transition-group>
                <li
                  class="todo-item"
                  :class="todo.completed ? 'done': 'undone'"
                  v-for="(todo,key) in todos"
                  :key="key"
                  @click="showDetail(todo, $event)"
                >
                  <div class="handle-wrapper">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </div>
                  <div class="todo-info">
                    <span class="label todo-title">{{todo.title}}</span>
                    <!-- <span class="label todo-description" v-if="todo.description">
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>-->
                    <!-- <span class="label todo-tags" v-if="todo.tags">
                      <span
                        class="badge badge-pill badge-info"
                        :style="{background:tag.color, color:'#fff'}"
                        v-for="(tag, key) in todo.tags"
                        :key="key"
                      >
                        <i class="fa fa-tag" aria-hidden="true"></i>
                        {{tag.name}}
                      </span>
                    </span>-->
                  </div>
                  <div class="todo-priority">
                    <div class="priority-dot" :style="{background:todo.priorityColor}"></div>
                    <span>{{todo.priority }}</span>
                  </div>
                  <div class="todo-tags">
<!--                    <i-->
<!--                      class="fa fa-tag"-->
<!--                      aria-hidden="true"-->
<!--                      data-toggle="dropdown"-->
<!--                      aria-haspopup="true"-->
<!--                      aria-expanded="false"-->
<!--                    ></i>-->
                    <div class="dropdown-menu" v-show="todo.tags.length <= 0">
                      <div class="dropdown-header">
                        <i class="fa fa-tag" aria-hidden="true"></i> 标签
                      </div>
                      <div class="no-tags">无可选择的标签</div>
                    </div>
                    <div class="dropdown-menu" v-if="todo.tags.length > 0">
                      <div class="dropdown-header">
                        <i class="fa fa-tag" aria-hidden="true"></i> 标签
                      </div>
                      <span
                        class="badge badge-pill badge-info"
                        :style="{background:tag.color, color:'#fff'}"
                        v-for="(tag, key) in todo.tags"
                        :key="key"
                      >
                        <!-- <i class="fa fa-tag" aria-hidden="true"></i> -->
                        {{tag.name}}
                      </span>
                    </div>
                    <span class="label todo-tags" v-show="todo.tags">
                      <span
                        class="badge badge-pill badge-info"
                        :style="{background:tag.color, color:'#fff'}"
                        v-for="(tag, key) in todo.tags"
                        :key="key"
                      >
                        <i class="fa fa-tag" aria-hidden="true"></i>
                        {{tag.name}}
                      </span>
                    </span>
                  </div>

                  <span class="todo-date">{{todo.inDate}}</span>
                  <div class="actions">
                    <button
                      type="button"
                      class="btn-picto"
                      @click.stop="completeTodo(key)"
                      :aria-label="todo.completed ? 'Undone' : 'Done'"
                      :title="todo.completed ? 'Undone' : 'Done'"
                    >
                      <i
                        aria-hidden="true"
                        class="material-icons"
                      >{{ todo.completed ? 'check_box' : 'check_box_outline_blank' }}</i>
                    </button>
                    <button
                      @click.stop="removeTodo(todo)"
                      type="button"
                      aria-label="Delete"
                      title="Delete"
                      class="btn-picto"
                    >
                      <i aria-hidden="true" class="material-icons">delete</i>
                    </button>
                  </div>
                </li>
              </transition-group>
            </draggable>
          </VuePerfectScrollbar>
        </ul>
        <div class="todo-footer" v-if="todos.length >0">
          <ul>
            <div class="actions">
              <button
                @click="clearTodos"
                type="button"
                aria-label="Delete"
                title="Delete"
                class="btn-picto"
              >
                清除全部
                <i aria-hidden="true" class="material-icons">delete</i>
              </button>
            </div>
          </ul>
        </div>
      </main>
    </section>
    <notifications group="foo" position="top right" class="my-style" width="400" />
    <todoDetailModal />
  </div>
</template>


<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import moment from "moment";
// import firebase from "firebase";
import navbar from "./Navbar";
import todoDetailModal from "./TodoDetailModal";
import taskApi from "../api/task";
import axios from 'axios'
import { Bus } from "./utils/bus";
import vueStore from "../store";
import { mapActions, mapGetters } from "vuex";
const uuidv4 = require("uuid/v4");

export default {
  components: {
    VuePerfectScrollbar,
    navbar,
    draggable,
    todoDetailModal,
    Bus
  },
  name: "Todo",
  data() {
    return {
      todos: [],
      completedTodos: 0,
      pendingTodos: 0,
      checkAll: false,
      newTodoText: "",
      isFullScreen: false,
      elem: document.documentElement,
      userLoggedIn: false,
      priorityColor: null,
      userData: {},
      userInfo: ""
    };
  },
  mounted() {
    // function dataUrlToFile(dataUrl,fileName){
    //   let arr =dataUrl.split(',');
    //   let mime=arr[0].match(/:(.*?);/)[1];
    //   let bstr=atob(arr[1])
    //   let n=bstr.length
    //   let u8arr=new Uint8Array(n);
    //   while (n--){
    //     u8arr[n]=bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr],fileName,{type:mime});
    // }
    // const base = 'data:image/ico;base64,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'
    // const file = dataUrlToFile(base, '12.ico')
    // const form = new FormData()
    // form.append('file', file)
    // form.append('sss', 12)
    // form.append('ss3s', 132)
    // axios.post('222', form,{
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    // })

  },
  // watch: {
  //   isFullScreen: function(newValue, oldValue) {}
  // },
  created() {
    this.fetchTodoList();
    // this.userLoggedIn = true;
    // let that = this;
    // document.onfullscreenchange = function(event) {
    //   if (!that.isFullScreen) {
    //     that.isFullScreen = true;
    //   } else {
    //     that.isFullScreen = false;
    //   }
    // };
    // this.updateTodos();
    console.log("getTodos ", this.getTodos);
  },
  computed: {
    ...mapGetters(["getTodos", "getUserData"])
  },
  methods: {
    ...mapActions(["createNewTodo", "markAsComplete", "deleteTodo"]),
    fetchTodoList(){
      taskApi.list().then(res=>{
        this.todos = res.list || []
        console.log(res);
      })
    },
    toggleFullScreen() {
      !this.isFullScreen ? this.openFullscreen() : this.closeFullscreen();
    },
    stopTheEvent(event) {
      event.stopPropagation();
    },
    openFullscreen() {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    },
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // let that = this;
      // var provider = new firebase.auth.GoogleAuthProvider();
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(
      //     function() {
      //       that.userLoggedIn = false;
      //       that.showNotification("You are logged out", "alert-danger");
      //       that.$router.replace("/");
      //     },
      //     function(error) {
      //       console.error("Sign Out Error", error);
      //     }
      //   );
    },
    showNotification(msg, alertType) {
      this.$notify({
        group: "foo",
        text: `<div class="alert ${alertType}" role="alert">${msg}</div> `,
        position: "top left",
        duration: 10000
      });
    },
    showDetail(todoItem, e) {
      console.log(
        "$(e.target).hasClass('.fa-tag') ",
        $(e.target).hasClass("fa-tag")
      );

      if ($(e.target).hasClass("fa-tag")) {
        console.log("clicked ", e.target);
        return false;
      } else {
        e.preventDefault();
        // e.stopPropagation();
        Bus.$emit("showDetailedTaskModal", todoItem);
      }
    },
    clearTodos() {
      this.$store.state.todos = [];
      this.updateTodos();
    },
    updateTodos() {
      this.completedTodos = this.todos.filter(item => item.completed);
      this.pendingTodos = this.todos.filter(item => !item.completed);
    },
    removeTodo(todo) {
      // console.log(key);
      taskApi.delete({
        id: todo.id
      }).then(res=>{

      })
      // this.deleteTodo(key);
      this.updateTodos();
    },
    completeTodo(key) {
      this.markAsComplete(key);
      this.updateTodos();
    },
    addnewTodo(e) {
      if (this.newTodoText.length > 0) {
        e.preventDefault();
        let newTodo = {
          completed: false,
          title: this.newTodoText,
          desc: null,
          inDate: moment().format("MM月DD日"),
          priority: "None",
          tags: [],
          priorityColor: "#11cdef"
        };
        taskApi.add(newTodo).then(res=>{
          this.$msg('新增成功')
          this.fetchTodoList()
        })
        // this.createNewTodo(newTodo);
        // this.userData.todos.push(newTodo);

        // this.todos.unshift(newTodo);
        // newTodo.id++;
        this.newTodoText = "";
        this.updateTodos();
      }
    },
    checkLogin() {}
  }
};
</script>
<style scoped>
section.main-section {
  height: 100%;
}
.card-body {
  text-align: left;
}

@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}
.count {
  font-size: 16px;
}
.count.completed {
  text-align: center;
}
.count.pending {
  text-align: right;
}
#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  /* max-width: 750px; */
  background: #fff;
  color: #32325d;
  box-shadow: 0 0 19px 10px rgba(100, 100, 100, 0.2);
  overflow: visible;
}
#todolist .row {
  text-align: left;
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}

#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin-top: 5px;
  padding: 0.5rem 1rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
  padding-left: 5px;
}

#todolist .actions {
  flex-shrink: 0;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .label.todo-title {
  /* display: block; */
  color: #7a797e;
}
#todolist .done .label,
#todolist .done .todo-priority,
#todolist .done .todo-tags,
#todolist .done .todo-date,
#todolist .done .actions {
  opacity: 0.6;
}
#todolist .done .label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #11cdef;
}

/* FORM */
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
.add-todo-field {
  border-radius: 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid #11cdef;
  color: #32325d;
  padding-right: 50px;
}
.add-todo-field:focus {
  box-shadow: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid #11cdef;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
}
.get-btn {
  padding: 0 1.3rem;
  border: none;
  background: #11cdef;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
.get-btn:hover {
  background: #11cdef;
}
form input,
.get-btn {
  font-family: "Quicksand", sans-serif;
  height: 3rem;
}

/* TOOGLE COMPONENT */
.togglebutton-wrapper {
  margin-top: 1em;
}
.togglebutton-wrapper label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.togglebutton-wrapper input {
  position: absolute;
  left: -9999px;
}
.togglebutton-wrapper .togglebutton-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.togglebutton-wrapper .tooglebutton-box {
  position: relative;
  display: block;
  margin-left: 0.6em;
  width: 38px;
  height: 22px;
  background: white;
  /*border:1px solid black;*/
  border-radius: 999px;
  cursor: pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 18px;
  height: 18px;
  /*border:1px solid #11cdef;*/
  border-radius: 50%;
  background: #11cdef;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
  left: calc(100% - 4px - 16px);
  opacity: 1;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  max-height: 450px;
  min-height: 350px;
}
.scroll-area .ps__scrollbar-y-rail {
  background: rgb(232, 232, 232);
  opacity: 1;
  width: 10px;
  border-radius: 8px;
}
.todo-footer {
  position: absolute;
  bottom: 0;
}
.todo-footer ul {
  display: flex;
}
.todo-footer .actions {
  display: flex;
}
.todo-footer .actions button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-wrapper {
  height: 100%;
}
@media screen and (min-width: 370px) {
  section.main-section {
    padding: 0;
  }
  #todolist {
    padding: 1.5rem;
    margin: 1rem auto;
  }
  #todolist h1 {
    font-size: 1.5rem;
  }
  .count.completed {
    text-align: left;
  }
  .count.pending {
    text-align: left;
  }
}
.fa.submit-icon {
  position: absolute;
  right: 30px;
  top: 12px;
  font-size: 25px;
  cursor: pointer;
}
.badge {
  font-size: 80%;
}
.navbar-dark .navbar-brand {
  font-size: 20px;
}
.todo-info {
  flex: 1 500px;
}
.todo-date {
  font-size: 12px;
  color: #8898aa;
  flex: 1 10%;
}
.my-style .vue-notification .notification-title {
  color: red !important;
}

#todolist li.todo-item:hover {
  background-color: #f4f5f7;
  cursor: pointer;
}
.todo-item .handle-wrapper {
  width: 20px;
  color: #b5b5b5;
  opacity: 0;
}
#todolist li.todo-item:hover .handle-wrapper {
  opacity: 1;
}
.handle-wrapper:hover {
  cursor: move;
}
.ghost {
  border-bottom: 1px solid #11cdef;
}
.user-icon img {
  width: 40px;
  cursor: pointer;
  border-radius: 50%;
}
.label.todo-description {
  font-size: 16px;
  background: #dedede;
  padding: 5px 8px;
  border-radius: 6px;
  color: #000;
  line-height: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.badge.badge-pill.badge-info {
  font-size: 11px;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: normal;
  padding: 3px 10px;
}
@media screen and (max-width: 370px) {
  #todolist {
    max-width: 400px;
    padding: 1rem;
  }
}
@media screen and (max-width: 768px) {
  #todolist {
    max-width: 650px;
    padding: 1.25rem;
  }
}
.todo-priority {
  flex: 1 1 100px;
  display: flex;
  align-items: center;
}
.todo-tags {
  display: flex;
  flex: 1 1 180px;
  text-align: center;
}
.todo-tags .fa-tag[data-toggle="dropdown"] {
  color: #7a797e;
  height: 30px;
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin: auto;
  transition: all 0.2s;
  border-radius: 50%;
}
.todo-tags .fa-tag[data-toggle="dropdown"]:hover {
  background: rgba(17, 205, 239, 0.5);
  color: #fff;
  transform: scale(1.2);
}
.todo-desc-icon {
  width: 20px;
}
.priority-dot {
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  margin-right: 10px;
}
.todo-tags .dropdown-menu.show .badge-pill.badge {
  font-size: 12px;
  text-transform: capitalize;
  padding: 8px 8px;
  display: block;
  margin: 10px;
  width: 120px;
  margin: 8px auto;
}
.dropdown-header {
  color: #7a797e;
  text-align: center;
  font-size: 16px;
  padding: 4px;
  text-transform: none;
  font-weight: 600;
  border-bottom: 1px solid #c5c5c5;
  margin: 0 20px;
}
.no-tags {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
}
@media (max-width: 767px) {
  #todolist li {
    flex-wrap: wrap;
  }
  .todo-info {
    flex: 1 70%;
  }
  .todo-priority {
    flex: 1 25%;
    display: flex;
    align-items: center;
    order: 2;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .todo-tags {
    flex: 1 10%;
    text-align: center;
    order: 3;
    flex-grow: 0;
  }
  .todo-date {
    flex: 1 10%;
    align-items: center;
  }
  #todolist .actions {
    flex-shrink: 0;
  }
}
</style>
