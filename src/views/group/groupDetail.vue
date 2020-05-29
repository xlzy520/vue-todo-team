<template>
  <div style="display: flex;justify-content: space-between">
    <div style="width: 65%">
      <v-card>
        <v-card-title>
          团队任务名: <a-tag color="#1296db" class="team-name">{{teamInfo.teamName}}</a-tag>
        </v-card-title>
        <v-card-subtitle>
          团队任务起止时间:
          <a-tag color="pink">{{teamInfo.startTime}}</a-tag>~
          <a-tag color="pink" style="margin-left: 5px">{{teamInfo.endTime}}</a-tag>
        </v-card-subtitle>
        <v-card-subtitle>
          团队任务描述: {{teamInfo.desc}}
        </v-card-subtitle>
        <v-card-text>
          <p>团队任务进度表</p>
          <v-sheet height="500">
            <v-calendar
                :now="today"
                :value="today"
                color="primary"
            >
              <template v-slot:day="{ present, past, date }">
                <v-row
                >
                  <template v-if="tracked[date]">
                    <v-sheet
                        :title="category[0]"
                        :color="colors[0]"
                        @click="complete"
                        :width="`100%`"
                        height="50%"
                        tile
                    >
                      <div style="text-align: center; color: #fff;line-height: 22px">打卡成功</div>
                      <div v-if="date === today && hasCheck"
                           style="background: #1296db;text-align: center; color: #fff;line-height: 22px">
                        已完成</div>
                    </v-sheet>
                  </template>
                </v-row>
              </template>
            </v-calendar>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="qiandao">
            <div>
              <span>已签到人员：</span>
              <div>
                <a-tag v-for="member in members1">{{member}}</a-tag>
              </div>
            </div>
            <div>
              <span>未签到人员：</span>
              <div>
                <a-tag color="#f50" v-for="member in members2">{{member}}</a-tag>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-text>
          <p>团队签到统计</p>
          <div ref="chart" id="analysis" style="width: 100%;height: 300px">

          </div>
        </v-card-text>
      </v-card>
    </div>
    <div style="width: 30%" class="members">
      <v-card>
        <v-card-title>小组成员</v-card-title>
        <v-card-text>
          <div class="member" v-for="member in members" :key="member.id">
            <v-avatar style="margin: 10px;cursor: pointer"
                      icon="user"
                      @click="viewMemberDetail(member)" color="">
              <!--            <v-icon dark>mdi-account-circle</v-icon>-->
              <img src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png" />
            </v-avatar>
            <span class="member-name">{{member.name}}</span>
          </div>

        </v-card-text>
      </v-card>
      <a-divider></a-divider>
      <v-card>
        <v-card-title>今日任务</v-card-title>
        <v-card-text>
          <a-textarea
              v-if="teamInfo.owner === userInfo.id"
              v-model="teamInfo.todayTask"
              @blur="updateTodayTask"
              placeholder="今日任务"
              :auto-size="{ minRows: 6, maxRows: 12 }"
          />
          <span v-else>{{teamInfo.todayTask}}</span>
          <div class="justify-center flex" style="width: 100%;margin-top: 20px">
            <a-tooltip :title="hasCheck? '已签到':''">
              <a-button type="primary" @click="complete" :disabled="hasCheck">已完成任务</a-button>
            </a-tooltip>
          </div>
        </v-card-text>
      </v-card>
    </div>
      <a-modal
        :title="currentMemberInfo.name + ' 的信息'"
        width="900px"
        :visible="detailDialog"
        :footer="null"
        @cancel="handleCancel"
    >
      <a-card hoverable>
        <a-descriptions title="基本信息" bordered>
          <a-descriptions-item label="姓名">{{currentMemberInfo.name}}</a-descriptions-item>
          <a-descriptions-item label="头像">
            <a-avatar src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png" size="128" />
          </a-descriptions-item>
          <a-descriptions-item label="手机号">{{currentMemberInfo.phone}}</a-descriptions-item>
          <a-descriptions-item label="邮箱">{{currentMemberInfo.email}}</a-descriptions-item>
          <a-descriptions-item label="性别">{{handleMale(currentMemberInfo.male)}}</a-descriptions-item>
          <a-descriptions-item label="年龄">{{currentMemberInfo.age}}</a-descriptions-item>
          <a-descriptions-item label="特长">
            <a-tag v-for="(tag,index) in handleSkill(currentMemberInfo.skill)"
                   :color="tagColor[index]" :key="tag">{{tag}}</a-tag>
          </a-descriptions-item>
        </a-descriptions>

        <v-divider style="margin:25px 0"></v-divider>
        <div style="width: 100%;padding: 10px">
          <div id="main" style="width: 100%;height: 300px"></div>
        </div>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import teamApi from "../../api/team";
  import attendApi from "../../api/attend";
  import moment from "moment";
  import userApi from "../../api/user";

  const mydDate = []
  for (let i = 0; i < 7; i++) {
    if (i < 6) {
      mydDate.push(moment().subtract(i, 'day').format('MM-DD'))
    } else {
      mydDate.push('今天')
    }
  }
  const tracked = {}
  for (let i = 0; i < 30; i++) {
    const date = moment().subtract(i, 'day').format('YYYY-MM-DD')
    tracked[date] = [23,45,10]
  }
  export default {
    name: "groupDetail",
    data() {
      return {
        detailDialog: false,
        today: moment().format('YYYY-MM-DD'),
        tracked: tracked,
        colors: ['green', '#fb8c00', '#000000'],
        tagColor: ['pink', 'orange', 'green', 'cyan', 'blue', 'purple', 'f50', '#87d068'],
        category: ['Development', 'Meetings', 'Slacking'],
        members: [],
        teamInfo: {},
        currentMemberInfo:{},
        todayTask: '完成这些作业',
        userInfo: {}
      }
    },
    computed: {
      members1() {
        return this.members.filter(v=> v.check).map(v=> v.name)
      },
      members2() {
        return this.members.filter(v=> !v.check).map(v=> v.name)
      },
      hasCheck(){
        return this.members1.findIndex(v=> v === this.userInfo.name) > -1
      }

    },
    watch: {
      $route(a, b){
        if (a.params.id !== b.params.id) {
          this.teamChart()
          this.getTeamInfo()
        }
      }
    },
    methods: {
      updateTodayTask(){
        teamApi.update({
          id: this.teamInfo.id,
          todayTask: this.teamInfo.todayTask
        }).then(res=>{
          this.$msg('更新今日任务成功')
        })
      },
      complete(){
        attendApi.add({
          teamId: this.teamInfo.id,
        }).then(res=>{
          this.$msg('签到成功')
          this.getTeamInfo()
        })
      },
      handleMale(male){
        return male === 'male'? '男' : '女'
      },
      handleSkill(skill){
        return skill? skill.split(','): ['无']
      },
      memberChart(data){
        const c = echarts.init(document.getElementById('main'));

        const optionData = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          title: {
            text: '签到情况',
            left: 'center',
            align: 'right'
          },
          xAxis: [
            {
              type: 'category',
              data: mydDate,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 1

            }
          ],
          series: [
            {
              name: '签到',
              type: 'bar',
              barWidth: '60%',
              data: [0, 0, 0, 1, 1, 1, data]
            }
          ]
        };

        c.setOption(optionData);
      },
      todayCheck(teamId, userId){
        return attendApi.todayCheck({
          teamId,
          userId
        })
      },
      viewMemberDetail(member){
        this.detailDialog = true
        this.currentMemberInfo = member
        this.todayCheck(this.teamInfo.id, member.id).then(res=>{
          this.memberChart(res.list.length)
        })

      },
      handleCancel(){
        this.detailDialog = false
        this.currentMemberInfo = {}
      },
      getTeamInfo(){
        const id = this.$route.params.id
        teamApi.getTeamInfo({id}).then(res=>{
          const { users, ...teamInfo } = res
          this.teamInfo = teamInfo
          const requests = users.map(v=> attendApi.todayCheck({
            teamId: teamInfo.id,
            userId: v.id
          }))
          Promise.all(requests).then(res=>{
            const results = users.map((v,index)=>{
              v.check = res[index].list.length
              return v
            })
            this.members = results
            this.teamChart()
          })
        })
      },
      getUserInfo(){
        userApi.getInfo().then(res=>{
          this.userInfo = res
        })
      },
      teamChart() {
        const c = echarts.init(document.getElementById('analysis'));
        const optionData = {
          xAxis: {
            type: 'category',
            data: mydDate
          },
          yAxis: {
            type: 'value',
            minInterval: 1
          },
          grid: {
            top: '2%'
          },
          series: [{
            data: [1, 1, 1, 1, 1, 2, this.members1.length],
            type: 'line',
          }]
        };
        c.setOption(optionData);
      }
    },
    mounted() {
      this.getTeamInfo()
      this.getUserInfo()
    },
  }
</script>

<style>
  .v-calendar-weekly__day-label{
    height: 30px;
  }

</style>

<style lang="scss" scoped>
  .v-card__subtitle + .v-card__subtitle{
    padding-top: 0px;
  }
  .team-name{
    font-weight: 500;
    font-size: 18px;
    margin-left: 10px;
  }
  .members{
    .member{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .v-avatar{
      border: 1px solid #eee;
    }
    .v-card__text{
      display: flex;
      flex-wrap: wrap;
    }
    .member-name{

    }
  }
  .qiandao{

  }

</style>
