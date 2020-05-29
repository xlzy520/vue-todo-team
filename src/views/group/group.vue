<template>
  <div style="display: flex;flex-wrap: wrap" >
<!--    <v-card hover class="todo-card"-->
<!--            style="font-size: 40px;display: flex;justify-content: center;align-items: center;cursor: pointer">-->
<!--      🔍-->
<!--    </v-card>-->
    <a-spin :spinning="loading" size="large"></a-spin>
    <span v-if="teams.length === 0 && !loading">暂无团队任务</span>
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
      <chart :chart-data="team" type="1day"></chart>
      <div class="text-center font-weight-bold mb-1">总人数： <a-tag color="red">{{team.count}}</a-tag></div>

    </v-card>
  </div>
</template>

<script>
  import teamApi from "../../api/team";
  import chart from "../../components/chart";
  import userApi from "../../api/user";
  import attendApi from "../../api/attend";

  export default {
    name: "group",
    components: {
      chart,
    },
    data() {
      return {
        teams: [],
        userInfo: {},
        loading: true
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo(){
        userApi.getInfo().then(res=>{
          this.userInfo = res
          this.getAllTeams()
        })
      },
      getAllTeams(){
        this.loading = true
        teamApi.myTeams().then(res=>{
          const teams = res.list.map(v=>{
            v.count = v.users.length
            return v
          })
          const filterTeams = teams.filter(
            team=> team.users.findIndex(f=> {
              console.log(f);
              return f.id=== this.userInfo.id
            }) > -1)
          const requests = filterTeams.map(v=> attendApi.todayCheck({
            teamId: v.id,
            userId: this.userInfo.id
          }))
          Promise.all(requests).then(res=>{
            const results = filterTeams.map((v,index)=>{
              v.check = res[index].list.length
              return v
            })
            this.teams = results

            console.log(res);
          })
          // filterTeams.forEach((f,index)=>{
          //   attendApi.todayCheck({
          //     teamId: f.id
          //   }).then(res=>{
          //     filterTeams[index].check = res.list.length
          //     this.teams = filterTeams
          //     this.$forceUpdate()
          //
          //     // this.$set(this.teams[index], 'check', res.list.length)
          //     // this.teams[index].check =
          //   })
          // })
        }).finally(() => {
          this.loading = false
        })
      },

      gotoDetail (team){
        const to='group/'+ team.id
        this.$router.push(to)
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
    /*height: 250px;*/
    margin-right: 30px;
    margin-top: 30px;
    cursor: pointer;
  }
</style>
