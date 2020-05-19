<template>
  <div style="display: flex;justify-content: space-between">
    <div style="width: 65%">
      <v-card>
        <v-card-title>
          天河一号项目
        </v-card-title>
        <v-card-subtitle>
          项目启动时间 {{new Date()}}
          <p> - {{new Date()}} </p>
        </v-card-subtitle>
        <v-card-text>
          <p>项目进度表</p>
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
          <p>项目分析</p>
          <div ref="chart" id="id" style="width: 100%;height: 300px">

          </div>
        </v-card-text>
      </v-card>
    </div>
    <div style="width: 30%">
      <v-card>
        <v-card-title>小组成员</v-card-title>
        <v-card-text>
          <v-avatar style="margin: 10px;cursor: pointer" @click="detailDialog = true" color="indigo" v-for="i in 30">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </v-card-text>
      </v-card>
    </div>

    <!--    detail dialog        -->
    <v-dialog
        v-model="detailDialog"
        width="900"
        scrollable
    >
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title
        >
          DXY 的信息
        </v-card-title>

        <v-card-text>

          <h2 style="margin:15px 0">
            基本信息
          </h2>
          <v-divider style="margin:15px 0"></v-divider>

          <div>
            <p style="display: flex">
              <span style="width: 50%">民族 : 汉</span>
              <span style="width: 50%">年龄 : 22 </span>
            </p>
            <p style="display: flex">
              <span style="width: 50%">民族 : 汉</span>
              <span style="width: 50%">年龄 : 22 </span>
            </p>
            <p style="display: flex">
              <span style="width: 50%">民族 : 汉</span>
              <span style="width: 50%">年龄 : 22 </span>
            </p>
          </div>

          <v-divider style="margin:15px 0"></v-divider>
          <div style="width: 100%;padding: 10px">
            <div id="main" style="width: 100%;height: 300px">

            </div>
          </div>


        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="detailDialog = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  end  detail dialog        -->


  </div>
</template>

<script>
  import echarts from 'echarts'

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
        category: ['Development', 'Meetings', 'Slacking'],
      }
    },
    watch: {
      detailDialog(newValue, oldValue) {
        this.$nextTick().then(r => {
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
        })
      }
    },
    mounted() {
      const c = echarts.init(document.getElementById('id'));
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
  }
</script>

<style scoped>

</style>
