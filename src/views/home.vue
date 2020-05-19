<template>
  <div id="container-main" class="container-fluid">
    <left-nav></left-nav>
    <div class="today-container">
      <v-app>
        <v-content>
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-content>
      </v-app>


    </div>
<!--    <router-view/>-->

    <!--    <task-list></task-list>-->
<!--    <right-view></right-view>-->
<!--    <todo></todo>-->
  </div>
</template>

<script>
  import LeftNav from "../components/LeftNav";
  import Todo from "../components/Todo";
  import TaskList from "../components/TaskList";
  import RightView from "../components/RightView";
export default {
  name: 'home',
  components: {
    LeftNav,
    Todo,
    TaskList,
    RightView
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
  .today-container{
    left: 260px;
    right: 0;
    position: absolute;
    top: 0;
    height: 100%;

  }</style>
