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
                    class="fill-height"
                >
                  <template v-if="past && tracked[date]">
                    <v-sheet
                        v-for="(percent, i) in tracked[date]"
                        :key="i"
                        :title="category[i]"
                        :color="colors[i]"
                        :width="`${percent}%`"
                        height="100%"
                        tile
                    ></v-sheet>
                  </template>
                </v-row>
              </template>
            </v-calendar>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <p>分析</p>
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
<!--      <v-card>-->
<!--        <v-card-title-->
<!--            class="headline grey lighten-2"-->
<!--            primary-title-->
<!--        >-->
<!--          DXY 的信息-->
<!--        </v-card-title>-->

<!--        <v-card-text>-->

<!--          <h2 style="margin:15px 0">-->
<!--            基本信息-->
<!--          </h2>-->
<!--          <v-divider style="margin:15px 0"></v-divider>-->

<!--          <div>-->
<!--            <p style="display: flex">-->
<!--              <span style="width: 50%">民族 : 汉</span>-->
<!--              <span style="width: 50%">年龄 : 22 </span>-->
<!--            </p>-->
<!--            <p style="display: flex">-->
<!--              <span style="width: 50%">民族 : 汉</span>-->
<!--              <span style="width: 50%">年龄 : 22 </span>-->
<!--            </p>-->
<!--            <p style="display: flex">-->
<!--              <span style="width: 50%">民族 : 汉</span>-->
<!--              <span style="width: 50%">年龄 : 22 </span>-->
<!--            </p>-->
<!--          </div>-->




<!--        </v-card-text>-->

<!--        <v-divider></v-divider>-->

<!--        <v-card-actions>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn-->
<!--              color="primary"-->
<!--              text-->
<!--              @click="detailDialog = false"-->
<!--          >-->
<!--            关闭-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
    </a-modal>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import teamApi from "../../api/team";

  export default {
    name: "groupDetail",
    data() {
      return {
        detailDialog: false,
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        today: '2019-01-10',
        tracked: {
          '2019-01-09': [23, 45, 10],
          '2019-01-08': [10],
          '2019-01-07': [0, 78, 5],
          '2019-01-06': [0, 0, 50],
          '2019-01-05': [0, 10, 23],
          '2019-01-04': [2, 90],
          '2019-01-03': [10, 32],
          '2019-01-02': [80, 10, 10],
          '2019-01-01': [20, 25, 10],
        },
        colors: ['#1867c0', '#fb8c00', '#000000'],
        tagColor: ['pink', 'orange', 'green', 'cyan', 'blue', 'purple', 'f50', '#87d068'],
        category: ['Development', 'Meetings', 'Slacking'],
        members: [],
        teamInfo: {},
        currentMemberInfo:{}
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
      handleMale(male){
        return male === 'male'? '男' : '女'
      },
      handleSkill(skill){
        return skill? skill.split(','): ['无']
      },
      memberChart(){
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
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };
        c.setOption(optionData);
      },
      viewMemberDetail(member){
        this.detailDialog = true
        this.currentMemberInfo = member
        this.$nextTick(() => {
          this.memberChart()
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
          this.members = users
        })
      },
      teamChart() {
        const c = echarts.init(document.getElementById('analysis'));
        const optionData = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            top: '2%'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        };
        c.setOption(optionData);
      }
    },
    mounted() {
      this.teamChart()
      this.getTeamInfo()
    },
  }
</script>

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


</style>
