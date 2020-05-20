<template>
  <div style="display: flex;flex-wrap: wrap">
<!--    <v-card hover class="todo-card"-->
<!--            style="font-size: 40px;display: flex;justify-content: center;align-items: center;cursor: pointer">-->
<!--      🔍-->
<!--    </v-card>-->
    <v-card class="todo-card" hover
            @click="gotoDetail(team)"
            v-for="team in teams" :key="team.id">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-avatar>
            <img src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <div :title="team.teamName">{{team.teamName}}</div>
        </v-list-item-content>
      </v-list-item>
      <div class="flex justify-center">
        <div class="text-center mb-1 font-weight-bold">开始： <a-tag color="pink">{{team.startTime}}</a-tag></div>
        <div class="text-center font-weight-bold">结束： <a-tag color="pink">{{team.endTime}}</a-tag></div>
      </div>
      <chart :chart-data="handleChartData(team)" type="1day"></chart>
    </v-card>
  </div>
</template>

<script>
  import teamApi from "../../api/team";
  import chart from "../../components/chart";

  export default {
    name: "group",
    components: {
      chart,
    },
    data() {
      return {
        teams: []
      }
    },
    mounted() {
      this.getAllTeams()
    },
    methods: {
      getAllTeams(){
        teamApi.myTeams().then(res=>{
          this.teams = res.list.map(v=>{
            v.count = v.users.length
            return v
          })
        })
      },
      gotoDetail (team){
        const to='group/'+ team.id
        this.$router.push(to)
      },
      handleChartData (team){
        return [100, 20]
      },
    },

  }
</script>

<style>
  .complete {
    background: lightgreen;
  }

  .todo {
    transition: all .3s;
    padding: 10px;
  }

  .todo:hover {
    background: rgba(180, 209, 220, 0.65);
  }

  .todo-card {
    width: 250px;
    height: 250px;
    margin-right: 30px;
    margin-top: 30px;
    cursor: pointer;
  }
</style>
