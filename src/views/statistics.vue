<template>
  <!--  <a-page-header-->
  <!--      style="border: 1px solid rgb(235, 237, 240)"-->
  <!--      title="Title"-->
  <!--      sub-title="This is a subtitle"-->
  <!--      @back="() => null"-->
  <!--  />-->
  <div class="statistics">
    <div class="container-sta">
      <div class="headerContainer">
        <div class="header">
          <div class="container_">
            <h1 class="title">统计</h1>
            <a-button type="primary" @click="gotoHome">完成</a-button>
          </div>
        </div>
      </div>
      <div class="contentContainer">
        <div class="viewContainer">
          <div class="overview">
            <div class="cardWrapper">
              <a-card title="概览">
                <div class="board_1wL8A">
                  <div class="row_1507L">
                    <div class="item_1MbpF"><p class="data_n5Gh9 text-primary">{{today}}</p>
                      <p class="title_2A3jq">今日已完成</p></div>
                    <div class="item_1MbpF"><p class="data_n5Gh9 text-primary">{{all}}</p>
                      <p class="title_2A3jq">总已完成</p></div>
                  </div>
                </div>
              </a-card>
            </div>
            <div class="cardWrapper">
              <a-card title="最近已完成趋势">
                <div id="chart1" ref="chart1"></div>
              </a-card>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import taskApi from "../api/task";
  import moment from 'moment'

  export default {
    name: 'statistics',
    data() {
      return {
        today: 0,
        all: 0
      }
    },
    methods: {
      gotoHome(){
        this.$router.push('/todo')
      },
      draw1() {
        const c = echarts.init(this.$refs.chart1);
        const date = []
        for (let i = 0; i < 7; i++) {
          if (i < 6) {
            date.push(moment().subtract(i, 'day').format('MM-DD'))
          } else {
            date.push('今天')
          }
        }
        const option = {
          backgroundColor: '#fff',
          grid: {
            top: '15%',
            left: '0%',
            right: '10%',
            bottom: '5%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            axisLabel: {
              color: '#7b7b7b'
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: false,
              length: 25,
              lineStyle: {
                color: "#06a7ff"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#06a7ff'
              }
            }
          },
          yAxis: [
            {
            type: 'value',
            axisLabel: {
            },

            axisTick: {
              show: false,
              length: 15,
              lineStyle: {
                color: "#06a7ff",
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#06a7ff'
              }
            },
          }
          ],
          series: [{
            name: '注册总量',
            type: 'line',
            smooth: true, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#5e72e4", // 线条颜色
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#5e72e4',
              }
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#5e72e4",
              borderWidth: 3
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#eb64fb'
                },
                  {
                    offset: 1,
                    color: '#3fbbff0d'
                  }
                ], false),
              }
            },
            data: [1, 3, 2, 4, 3, 4, this.today]
          }]
        };
        c.setOption(option);

      },
      fetch(){
        taskApi.statistics().then(res=>{
          this.today = res.list.count
          this.draw1()
        })
        taskApi.search().then(res=>{
          this.all = res.list.count
        })
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style lang="scss" scoped>
  .item_1MbpF+.item_1MbpF::before {
    content: " ";
    position: absolute;
    width: 1px;
    background-color: hsla(0,0%,59.2%,.24);
    left: 0;
    top: 0;
    bottom: 0;
    margin: 18px 0;
  }


  .statistics {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 5;

    .container-sta {
      max-width: 980px;
      width: 85%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      height: 100%;

      .headerContainer {
        margin-top: 42px;
        flex: none;
        padding: 0 10px;

        .header {
          max-width: 960px;
          width: 100%;
          height: 50px;

          .container_ {
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: space-between;
            align-items: center;

            .title {
              font-size: 28px;
              font-weight: 500;
              color: #000;
              line-height: 40px;
            }
          }
        }
      }

      .contentContainer {
        flex: 1 1 100%;
        margin-top: 50px;
        overflow: hidden;

        .viewContainer {
          overflow: auto;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 10px;
          position: relative;
        }

        .overview {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
        }
      }
    }
  }

  .cardWrapper {
    width: 472px;
    height: 260px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .08);
    border-radius: 8px;
  }
  .board_1wL8A{
    display: flex;
    flex: auto;
    flex-direction: column;
    height: 160px;
    .row_1507L {
      flex: auto;
      display: flex;
      align-items: center;
    }
    .item_1MbpF {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1 1;
      text-align: center;
      padding: 18px 10px;
      overflow: hidden;
      white-space: nowrap;
      .data_n5Gh9 {
        font-size: 28px;
        font-weight: 600;
        color: #000;
        line-height: 1;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title_2A3jq {
        line-height: 1;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0,0,0,.24);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  #gailan, #chart1 {
    /*width: 448px;*/
    height: 160px;
  }
  .cardWrapper:nth-of-type(2n) {
    margin-left: 16px;
  }
</style>
