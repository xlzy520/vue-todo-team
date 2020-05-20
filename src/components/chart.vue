<template>
  <div ref="chart" class="chart" style="width: 250px;height: 160px" @click.stop="()=>{}">

  </div>
</template>

<script>

  import echarts from "echarts";
  import 'echarts-liquidfill/src/liquidFill.js';

  export default {
    name: 'chart',
    props: ['chartData', 'type'],
    data() {
      return {

      }
    },
    methods: {
      draw() {
        const names = this.type === '1day' ? [ '已签到', '未签到', ] : [ '已完成',  '未完成', ]
        const c = echarts.init(this.$refs.chart);
        var val1data2 = [{
          value: this.chartData[0],
          name: names[0],
        },
          {
            value: this.chartData[1],
            name: names[1],
          },

        ]
        const total = this.chartData[0] + this.chartData[1]
        const completeRate = ((this.chartData[0] / total)).toFixed(2)

        var arr = ['middleLost', completeRate, val1data2, '人数：'+total]

        const option = {
          legend: {
            show: true,
            data: names
          },
          grid: {

          },
          title: {
            top: '55%',
            left: 'center',
            text: arr[3],
            textStyle: {
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 14
            },
            subtext: '完成度' + (arr[1] * 10000 / 100).toFixed(2) + '%',
            subtextStyle: {
              color: '#000',
              fontSize: 12
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(res) {
              if (res.componentSubType == 'liquidFill') {
                return res.seriesName;
              } else {
                return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ':<br/> ' + res.data.value;
              }
            }
          },
          series: [{
            type: 'liquidFill',
            itemStyle: {
              normal: {
                opacity: 0.4,
                shadowBlur: 0,
                shadowColor: 'blue'
              }
            },
            name: arr[3],
            data: [{
              value: completeRate,
              itemStyle: {
                normal: {
                  color: '#53d5ff',
                  opacity: 0.6
                }
              }
            }],
            //  background: '#fff',
            color: ['#53d5ff'],
            center: ['50%', '50%'],
            /*  backgroundStyle: {
                  color: '#fff'
              },*/
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  fontSize: 12
                }
              }
            },
            outline: {
              itemStyle: {
                borderColor: '#86c5ff',
                borderWidth: 0
              },
              borderDistance: 0
            }
          },
            {
              type: 'pie',
              radius: ['42%', '50%'],
              color: ['#c487ee', '#deb140','#49dff0', '#034079', '#6f81da', '#00ffb4'],
              hoverAnimation: false, ////设置饼图默认的展开样式
              label: {
                show: true,

                normal: {
                  formatter: '{b}\n{c}',
                  show: true,
                  // position: ''
                },
              },
              labelLine: {
                normal: {
                  show: true
                }
              },

              itemStyle: { // 此配置
                normal: {
                  borderWidth: 2,
                  borderColor: '#fff',
                },
                emphasis: {
                  borderWidth: 0,
                  shadowBlur: 2,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data: arr[2]
            }
          ]
        }
        c.setOption(option);
      }
    },
    mounted() {
      this.draw()
    },
  }
</script>

<style lang="scss" scoped>
  .chart{

  }
</style>
