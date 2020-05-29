<template>
  <div id="left-view" class="g-left">
    <div class="tool-bar">
      <div class="indicator animated completed"></div>
      <div class="tool-bar-inner">
        <a-dropdown :trigger="['click']">
          <div class="t-user user">
            <a id="tl-bar-user">
              <img class="avatar" alt=""
                   src="https://cdn.jsdelivr.net/gh/xlzy520/nav@gh-pages/favicon.png">
              <svg class="icon-user-icon icon-s-normal-tny">
                <use xlink:href="#user-icon"></use>
              </svg>
            </a>
            <span class="username t-name">{{userInfo.name}}</span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click="goToUserProfile">
              <a-icon type="user"/>
              <span>个人中心</span>
            </a-menu-item>
            <a-menu-item @click="goToStatistics">
              <a-icon type="bar-chart"/>
              <span>统计</span>
            </a-menu-item>
            <a-menu-item @click="toggleFullScreen">
              <a-icon :type="isFullScreen?'fullscreen-exit': 'fullscreen'"/>
              <span>{{ isFullScreen ? '退出全屏' : '进入全屏'}}</span>
            </a-menu-item>
            <a-menu-item @click="logout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <div class="tip feature-tip hide">
          <span></span>
          <i class="icon_home icon-pointer-black-up"></i>
        </div>
        <div class="t-notify">
          <a class="power-tip" title="通知">
            <svg class="icon-notification i-1">
              <use xlink:href="#notification"></use>
            </svg>
          </a>
        </div>
        <div id="search" class="t-search">
          <div class="search-icon">
            <svg class="icon-search i-1">
              <use xlink:href="#search"></use>
            </svg>
          </div>
          <div class="search-form inactive">
            <div class="search-input">
              <input type="text" class="search-box" placeholder="搜索" autocomplete="off" tabindex="-1" value="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-collapse v-model="activeKey" style="margin-top: 58px">
      <a-collapse-panel key="1" header="近期待办任务">
        <div id="project-list-view" class="lists">
          <div class="project-list-inner antiscroll-wrap">
            <div id="project-list-scroller" class="antiscroll-inner first-hide" style="height: 100%">
              <section id="smart-project-view-area" class="smart-project-view-area">
                <ul>
                  <li v-for="(item, index) in date" :key="item.name"
                      @click="handleActive(item)"
                      :class="['project', {
                    active: item.name === active
                  }]">
                    <a class="project-box project-link l-item">
                      <svg-icon :icon-class="item.icon"></svg-icon>
                      <div class="outer-date">
                        <span class="inner-date">{{item.num}}</span>
                      </div>
                      <span class="l-title">{{item.name}}</span>
                      <div class="color-tip" style="background-color: transparent;"></div>
                      <div class="action-tip" v-if="item.name !== '日历'">
                        <span class="count">{{item.count?item.count: ''}}</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="任务合集">
        <div id="project-list-view" class="lists">
          <div class="project-list-inner antiscroll-wrap">
            <div id="project-list-scroller" class="antiscroll-inner first-hide" style="height: 100%">
              <section id="smart-project-view-area" class="smart-project-view-area">
                <ul>
                  <li v-for="(item, index) in project" :key="item.name"
                      @click="handleActive(item)"
                      :class="['project', {
                    active: item.name === active
                  }]">
                    <a class="project-box project-link l-item">
                      <svg-icon :icon-class="item.icon"></svg-icon>
                      <div class="outer-date" v-if="item.key === 'date'">
                        <span class="inner-date">{{item.num}}</span>
                      </div>
                      <span class="l-title">{{item.name}}</span>
                      <div class="color-tip" style="background-color: transparent;"></div>
                      <div class="action-tip" v-if="item.name !== '日历'">
                        <span class="count">{{item.count?item.count: ''}}</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
<!--              <div class="tabs-container" id="project-view-area">-->
<!--                <div class="l-tabs l-l-t l-c">-->
<!--                  <a class="tab l-tab t-active l-tab-project"><span class="text-def">标签</span></a>-->
<!--                </div>-->
<!--                <div class="l-tab-panels">-->
<!--                  <section>-->
<!--                    <ul>-->
<!--                      <li v-for="(item, index) in tags" :key="item.name"-->
<!--                          @click="handleActive(item, true)"-->
<!--                          :class="['tag-li', {-->
<!--                   active: item.name === active-->
<!--                  }]">-->
<!--                        <a class="project-link l-item">-->
<!--                          <svg-icon icon-class="tag"></svg-icon>-->
<!--                          <span title="test" class="tag-name l-title">{{item.name}}</span>-->
<!--                          <div class="action-tip">-->
<!--                            <span class="count">{{item.count?item.count: ''}}</span>-->
<!--                          </div>-->
<!--                        </a>-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                    <div class="l-new">-->
<!--                      <a class="pointer">-->
<!--                        <svg-icon icon-class="add-list"></svg-icon>-->
<!--                        <span class="l-title">添加标签</span>-->
<!--                      </a>-->
<!--                    </div>-->
<!--                  </section>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="l-divider"></div>-->
            </div>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="团队任务">
        <div id="project-list-view" class="lists">
          <div class="project-list-inner antiscroll-wrap">
            <div id="project-list-scroller" class="antiscroll-inner first-hide" style="height: 100%">
              <section id="smart-project-view-area" class="smart-project-view-area">
                <div class="l-new" @click="goToTeamList"
                     :class="['project', {
                       active: 'teamList' === active
                }]">
                  <a class="pointer">
                    <a-icon type="search" />
                    <svg-icon icon-class="all-list"></svg-icon>
                    <span class="l-title">全部团队任务</span>
                  </a>
                </div>

                <div class="l-divider"></div>

                <div class="l-new" @click="searchTeamDialog">
                  <a class="pointer">
                    <a-icon type="search" />
                    <svg-icon icon-class="search"></svg-icon>
                    <span class="l-title">查找团队任务</span>
                  </a>
                </div>
                <div class="l-divider"></div>

                <div class="l-new" @click="createTeamDialog">
                  <a class="pointer">
                    <svg-icon icon-class="add-list"></svg-icon>
                    <span class="l-title">创建团队任务</span>
                  </a>
                </div>

              </section>
            </div>
          </div>
        </div>

      </a-collapse-panel>
      <a-collapse-panel key="4" v-if="userInfo.role === 'admin'" header="后台管理">
        <div id="project-list-view" class="lists">
          <div class="project-list-inner antiscroll-wrap">
            <div id="project-list-scroller" class="antiscroll-inner first-hide" style="height: 100%">
              <section id="smart-project-view-area" class="smart-project-view-area">
                <ul>
                  <li v-for="(item, index) in admin" :key="item.name"
                      @click="handleAdmin(item)"
                      :class="['project', {
                    active: item.name === active
                  }]">
                    <a class="project-box project-link l-item">
                      <svg-icon :icon-class="item.icon"></svg-icon>
                      <div class="outer-date" v-if="item.key === 'date'">
                        <span class="inner-date">{{item.num}}</span>
                      </div>
                      <span class="l-title">{{item.name}}</span>
                      <div class="color-tip" style="background-color: transparent;"></div>
                      <div class="action-tip" v-if="item.name !== '日历'">
                        <span class="count">{{item.count?item.count: ''}}</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </div>
      </a-collapse-panel>

    </a-collapse>
    <div id="left-bottom-view"></div>
    <a-modal
        title="创建团队任务"
        :visible="teamVisible"
        :confirm-loading="confirmLoading"
        @ok="handleCreateTeam"
        @cancel="handleCancel"
        ok-text="确认" cancel-text="取消"
    >
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol"
                    :rules="rules">
        <a-form-model-item label="团队任务名" prop="teamName">
          <a-input v-model="form.teamName" placeholder="团队任务名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="加入密码" prop="password">
          <a-input v-model="form.password" placeholder="密码"></a-input>
        </a-form-model-item>
        <a-form-model-item label="团队起止时间" prop="date">
          <a-range-picker
              :locale="locale"
              v-model="form.date"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              valueFormat="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
          />
        </a-form-model-item>
        <a-form-model-item label="团队任务介绍" prop="desc">
          <a-input type="textarea" v-model="form.desc" placeholder="团队任务介绍" >
          </a-input>
        </a-form-model-item>
      </a-form-model>

    </a-modal>
    <a-modal
        title="查找团队任务"
        :visible="searchTeamVisible"
        :confirm-loading="confirmLoading"
        :footer="null"
        width="1000px"
        @cancel="handleSearchCancel"
    >
      <a-input-search v-model="searchTeamName" placeholder="输入团队任务名" enter-button @search="onSearch" />
      <a-table :columns="columns" :data-source="searchTeamList">
        <span slot="action" slot-scope="text, record">
          <a class="table-action" @click="passwordTeamDialog(record)">加入</a>
        </span>
      </a-table>

    </a-modal>
    <a-modal
        title="输入团队密码"
        :visible="passwordVisible"
        @cancel="handlePasswordCancel"
        ok-text="确认" cancel-text="取消"
        @ok="joinTeam"
    >
      <a-input v-model="teamPassword" placeholder="团队密码"></a-input>
    </a-modal>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {removeFetchDefaultHeader} from "../utils/baseRequest";
  import userApi from "../api/user";
  import teamApi from "../api/team";
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';

  export default {
    name: 'LeftNav',
    data() {
      return {
        moment,
        locale,
        activeKey: '1',
        isFullScreen: false,
        elem: document.documentElement,
        date: [
          {name: '今天明天', icon: 'today-list', key: 'today-tomorrow', num: new Date().getDate(), type:'date'},
          {name: '最近七天', icon: 'today-list', key: '7day', num: '七', type:'date'},
        ],
        project: [
          {name: '所有任务', icon: 'all-list', key: 'all', type:'project'},
          // {name: '已完成', icon: 'completed-list', key: 'completed', type:'project'},
          {name: '垃圾桶', icon: 'delete-list', key: 'delete', type:'project'},
        ],
        admin: [
          {name: '用户管理', icon: 'user', key: 'user-manage'},
          // {name: '已完成', icon: 'completed-list', key: 'completed', type:'project'},
          {name: '任务管理', icon: 'dashboard', key: 'task-manage'},
        ],
        tags: [
          {name: '标签1', icon: 'all-list', key: 'all', type:'tags'},
          {name: '标签2', icon: 'all-list', key: 'all', type:'tags'},
        ],
        team: [],
        columns: [
          { title: '任务名', key: 'teamName', dataIndex: 'teamName', width: 200,},
          { title: '任务介绍', key: 'desc', dataIndex: 'desc', width: 200},
          { title: '开始时间', key: 'startTime', dataIndex: 'startTime', width: 160},
          { title: '结束时间', key: 'endTime', dataIndex: 'endTime', width: 160},
          { title: '参与人数', key: 'count', dataIndex: 'count', width: 160},
          { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, width: 80},
        ],
        searchTeamList: [],
        active: '所有',
        completed: 2,
        trash: 0,

        teamVisible: false,
        searchTeamVisible: false,
        passwordVisible: false,
        confirmLoading: false,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        form: {
          teamName: '',
        },
        searchTeamName: '',

        teamPasswordId: '',
        teamPassword: '',

        rules: {
          password: [
            this.$rules.required('密码', 'change'),
            this.$rules.minMax(6, 20, '请输入6-20位密码', 'change'),
          ],
          teamName: [
            this.$rules.required('团队名称', 'change'),
          ],
          date: [
            this.$rules.required('请选择起止时间', 'change'),
          ],
        },
        userInfo: {}

      }
    },
    computed: {
      ...mapGetters(["getTodos", "getUserData", 'todoNav'])
    },
    mounted() {
      // this.getAllTeams()
      console.log(this.$route.name);
      if (this.$route.name) {
        this.active = this.$route.name
      }
      this.getUserInfo()

    },
    methods: {
      getUserInfo(){
        userApi.getInfo().then(res=>{
          this.userInfo = res
          console.log(res);
        })
      },
      goToTeamList (){
        this.active = 'teamList'
        this.$router.push('/todo/teamList')
      },
      joinTeam(row){
        if (!this.teamPassword) {
          this.$msg('请输入团队密码', 'info')
          return
        }
        teamApi.join({
          id: this.teamPasswordId,
          password: this.teamPassword
        }).then(res=>{
          this.$msg('加入团队成功')
          this.handlePasswordCancel()
        })
      },
      onSearch(){
        teamApi.search({teamName: this.searchTeamName}).then(res=>{
          this.searchTeamList = res.list.map(v=>{
            v.count = v.users.length
            v.startTime = moment(v.startTime).format('YYYY-MM-DD HH:mm')
            v.endTime = moment(v.endTime).format('YYYY-MM-DD HH:mm')
            return v
          })
          this.$msg('查询成功')
        })
      },
      getAllTeams(){
        teamApi.myTeams().then(res=>{
          this.team = res.list.map(v=>{
            v.count = v.users.length
            return v
          })
        })
      },
      handleAdmin(item){
        this.active = item.name
        this.$router.push('/todo/'+ item.key)
      },
      handleActive(item, isTag = false) {
        this.active = item.name
        const query = {
          filter: item.key,
          isTag: isTag ? 1: 0
        }
        this.$store.dispatch('updateQuery', query)
        const type = item.type
        if (type === 'date') {
          this.$router.push({
            path: '/todo/'+ item.key,
            // query
          })
        } else {
          this.$router.push({
            path: '/todo/filter',
            query
          })
        }

      },
      toggleFullScreen() {
        !this.isFullScreen ? this.openFullscreen() : this.closeFullscreen();
        this.isFullScreen = !this.isFullScreen
      },
      logout() {
        removeFetchDefaultHeader()
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      createTeamDialog() {
        this.teamVisible = true;
      },
      searchTeamDialog() {
        this.searchTeamVisible = true;
      },
      passwordTeamDialog(row) {
        this.passwordVisible = true;
        this.teamPasswordId = row.id
      },
      handleCreateTeam() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            this.form.startTime = this.form.date[0]
            this.form.endTime = this.form.date[1]
            teamApi.add(this.form).then(res=>{
              this.$msg('创建团队成功')
              this.getAllTeams()
              this.handleCancel()
              // this.$router.push('/todo')
            }).finally(() => {
              this.confirmLoading = false;
            })
          }
        });
      },
      handleCancel() {
        this.teamVisible = false;
        this.form = {}
      },
      handleSearchCancel() {
        this.searchTeamVisible = false;
        this.searchTeamName = ''
        this.searchTeamList = []
      },
      handlePasswordCancel() {
        this.passwordVisible = false;
        this.teamPassword = ''
        this.teamPasswordId = ''
      },
      goToUserProfile() {
        this.$router.push('/todo/account/center')
      },
      goToStatistics() {
        this.$router.push('/statistics')
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
    },
  }
</script>

<style lang="scss">
  #left-view{
    overflow: auto;
    .lists{
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .ant-collapse{
      background-color: unset;
      border: none;
    }
  }
  .table-action{
    color: #1296db!important;
    cursor: pointer;
  }
</style>
