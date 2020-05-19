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
            <span class="username t-name">执笔看墨花开</span>
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
              <div class="tabs-container" id="project-view-area">
                <div class="l-tabs l-l-t l-c">
                  <a class="tab l-tab t-active l-tab-project"><span class="text-def">标签</span></a>
                </div>
                <div class="l-tab-panels">
                  <section>
                    <ul>
                      <li v-for="(item, index) in tags" :key="item.name"
                          @click="handleActive(item, true)"
                          :class="['tag-li', {
                   active: item.name === active
                  }]">
                        <a class="project-link l-item">
                          <svg-icon icon-class="tag"></svg-icon>
                          <span title="test" class="tag-name l-title">{{item.name}}</span>
                          <div class="action-tip">
                            <span class="count">{{item.count?item.count: ''}}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div class="l-new">
                      <a class="pointer">
                        <svg-icon icon-class="add-list"></svg-icon>
                        <span class="l-title">添加标签</span>
                      </a>
                    </div>
                  </section>
                </div>
              </div>
              <div class="l-divider"></div>
            </div>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="我的团队">
        <div id="project-list-view" class="lists">
          <div class="project-list-inner antiscroll-wrap">
            <div id="project-list-scroller" class="antiscroll-inner first-hide" style="height: 100%">
              <section id="smart-project-view-area" class="smart-project-view-area">
                <ul>
                  <li v-for="(item, index) in team" :key="item.teamName"
                      @click="handleTeamActive(item)"
                      :class="['project', {
                    active: item.teamName === active
                  }]">
                    <a class="project-box project-link l-item">
                      <svg-icon icon-class="team"></svg-icon>
                      <span class="l-title">{{item.teamName}}</span>
                      <div class="action-tip">
                        <span class="count">{{item.count?item.count: ''}}</span>
                      </div>
                    </a>
                  </li>
                </ul>
                <div class="l-divider"></div>

                <div class="l-new" @click="searchTeamDialog">
                  <a class="pointer">
                    <a-icon type="search" />
                    <svg-icon icon-class="search"></svg-icon>
                    <span class="l-title">查找团队</span>
                  </a>
                </div>
                <div class="l-new" @click="createTeamDialog">
                  <a class="pointer">
                    <svg-icon icon-class="add-list"></svg-icon>
                    <span class="l-title">创建团队</span>
                  </a>
                </div>

              </section>
            </div>
          </div>
        </div>

      </a-collapse-panel>
    </a-collapse>
    <div id="left-bottom-view"></div>
    <a-modal
        title="创建团队"
        :visible="teamVisible"
        :confirm-loading="confirmLoading"
        @ok="handleCreateTeam"
        @cancel="handleCancel"
        ok-text="确认" cancel-text="取消"
    >
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol"
                    :rules="rules">
        <a-form-model-item label="团队名" prop="teamName">
          <a-input v-model="form.teamName" placeholder="团队名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.password" placeholder="密码"></a-input>
        </a-form-model-item>
        <a-form-model-item label="团队介绍" prop="desc">
          <a-input type="textarea" v-model="form.desc" placeholder="团队介绍" >
          </a-input>
        </a-form-model-item>
<!--        <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">-->
<!--          <button type="submit" @click="onSubmit" class="btn btn-success btn-round btn-block btn-lg">注册</button>-->
<!--        </a-form-model-item>-->
      </a-form-model>

    </a-modal>
    <a-modal
        title="查找团队"
        :visible="searchTeamVisible"
        :confirm-loading="confirmLoading"
        :footer="null"
        @cancel="handleSearchCancel"
    >
      <a-input-search v-model="searchTeamName" placeholder="输入团队名" enter-button @search="onSearch" />
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

  export default {
    name: 'LeftNav',
    data() {
      return {
        activeKey: '1',
        isFullScreen: false,
        elem: document.documentElement,
        date: [
          {name: '今天明天', icon: 'today-list', key: 'today-tomorrow', num: new Date().getDate()},
          {name: '最近七天', icon: 'today-list', key: '7day', num: '七'},
        ],
        project: [
          {name: '所有', icon: 'all-list', key: 'all'},
          {name: '已完成', icon: 'completed-list', key: 'completed'},
          {name: '垃圾桶', icon: 'delete-list', key: 'delete'},
        ],
        tags: [
          {name: '标签1', icon: 'all-list', key: 'all'},
          {name: '标签2', icon: 'all-list', key: 'all'},
        ],
        team: [],
        columns: [
          { title: '团队名', key: 'teamName', dataIndex: 'teamName'},
          { title: '团队介绍', key: 'desc', dataIndex: 'desc'},
          { title: '团队人数', key: 'count', dataIndex: 'count'},
          { title: '操作', key: 'count', scopedSlots: { customRender: 'action' },},
        ],
        searchTeamList: [],
        active: '所有',
        completed: 2,
        trash: 0,

        teamVisible: false,
        searchTeamVisible: false,
        passwordVisible: false,
        confirmLoading: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
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
          ]
        },

      }
    },
    computed: {
      ...mapGetters(["getTodos", "getUserData", 'todoNav'])
    },
    mounted() {
      this.getAllTeams()
    },
    methods: {

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
        })
      },
      onSearch(){
        teamApi.search({teamName: this.searchTeamName}).then(res=>{
          this.searchTeamList = res.list
          this.$msg('查询成功')
        })
      },
      getAllTeams(){
        teamApi.myTeams().then(res=>{
          this.team = res.list
        })
      },
      handleTeamActive(item){
        this.active = item.teamName
        this.$router.push('/todo/team/'+ item.id)
      },
      handleActive(item, isTag = false) {
        this.active = item.name
        const query = {
          filter: item.key,
          isTag: isTag ? 1: 0
        }
        this.$store.dispatch('updateQuery', query)
        this.$router.push({
          path: '/todo/'+ item.key,
          query
        })
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
      handleSearchTeam(){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
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
