<template>
  <div class="tasklist tasks g-center" id="task-list-view">
    <header class="tl-bar">
      <div id="project-name-bar" class="tl-bar-project-name">
        <h5 class="text-primary tl-des select-enabled">{{title}}</h5>
      </div>
      <div class="tl-bar-action-bar">
        <div class="line-right">
          <div class="tl-bar-action">
            <a class="inline-block action-btn">
              <svg-icon class="i-o-36 i-h-o-54" icon-class="sort-by-duedate"></svg-icon>
            </a>
          </div>
          <div class="tl-bar-action" id="tl-bar-action">
            <a title="更多">
              <svg-icon class="i-o-36 i-h-o-54" icon-class="more"></svg-icon>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div id="add-task" class="tl-quick">
      <div :class="['task-input', 'input-lrg',{'focus': focus}]" @click="focusInput">
        <div v-show="focus" class="task-title inline-editor">
          <a-input ref="input" placeholder='添加任务至"收集箱"，回车即可保存' @blur="blur">
          </a-input>
          <div class="preset tl-q-preset">
            <div class="preset-time timecard-trigger" tabindex="0">
              <a>
                  <span class="icons">
                    <svg-icon v-show="checkDate" icon-class="date-unselected" class="i-2-1 fast-transition"></svg-icon>
                    <svg-icon v-show="!checkDate" icon-class="today-list" class="i-5 fill-theme"></svg-icon>
                  </span>
                <span class="selected-title text-tny i-2"></span>
              </a>
            </div>
            <div class="preset-more dropdown" tabindex="0">
              <a>
                <svg-icon icon-class="triangle-down-24" class="fast-transition i-2-1"></svg-icon>
              </a>
            </div>
          </div>
        </div>
        <div v-show="!focus" class="CodeMirror">
          <pre>添加任务至"收集箱"，回车即可保存</pre>
        </div>
      </div>
    </div>
    <div id="task-list-body" class="task-list-body tl-body">
      <div class="task-ul-list tl-wrap antiscroll-wrap" id="task-ul-list">
        <div class="tl-inner antiscroll-inner" id="task-list-scroll" style="height: 100%">
          <div id="task-list-content" class="content">
            <a-collapse default-active-key="1" :bordered="false">
              <template #expandIcon="props">
                <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
              </template>
              <a-collapse-panel key="1" header="已过期" :style="customStyle">
                <div class="task-header">
                  <ul>
                    <li class="task priority-high active selected">
                      <a taskid="5e2bcfa56f08615b844e229c" projectid="5e2bcf696f08615b844e2294"></a>
                      <div class="t-line top"></div>
                      <div class="l-task-bg">
                        <div class="l-task">
                          <div class="t-inner task-inner cr-pointer"><span class="drag" draggable="true">
                            <svg-icon icon-class="drag" class="i-4 i-mic"></svg-icon>
                          </span><span
                              class="t-check check-toggle cr-pointer"><span class="checker avoid-event">
                            <svg-icon icon-class="checkbox" class="i-tny i-4"></svg-icon>

                          </span></span>
                            <div class="tips line-right">
                              <div class="tag-list">
                                <div class="tag-item custom-color" style="background: rgba(221, 227, 88, 0.5);"><a
                                    class="tag-name" style="color: rgba(51, 51, 41, 0.85);">323</a></div>
                                <div class="tag-item custom-color" style="background: rgba(42, 147, 100, 0.5);"><a
                                    class="tag-name" style="color: rgba(41, 51, 46, 0.85);">31</a></div>
                                <div class="tag-item tag-rest-count">+6</div>
                              </div>
                              <span class="tip project-hint show">
                                <i class="project-color" style="background-color: transparent;"></i>
                                <span class="project-name text-tny">哔哩哔哩图床</span>
                              </span>
                              <span class="tip note-hint active show">
                              <svg class="icon-item-text i-s-16 i-o-12 i-black"><use
                                xlink:href="#item-text"></use></svg>
                            </span><span class="tip date-hint t-date show"><span
                                class="due-date text-tny duedate-overdue"> 5月13日</span></span></div>
                            <div class="title-wrap">
                              <div class="inline-editor word-nowrap title transition text-def typeahead line-left">
                                <div contenteditable="true">尝试还能不能完成picgo插件</div>
                              </div>
                            </div>
                          </div>
                          <div class="t-menu-toggle"><a>
                            <svg class="icon-more-for-task i-1">
                              <use xlink:href="#more-for-task"></use>
                            </svg>
                          </a></div>
                          <div class="content-print has-text">
                            <div class="t-content">22<br>2</div>
                            <div class="t-desc"></div>
                            <div class="t-subtask"></div>
                          </div>
                        </div>
                      </div>
                      <div class="t-line bottom"></div>
                      <div class="drag-help task ui-sortable-helper hide"
                           style="position: absolute; top: 0px; z-index: -1;"></div>
                    </li>
                    <li class="task">
                      <a taskid="5ebed9422995e545cf78cf0f" projectid="inbox1014767219"></a>
                      <div class="t-line top"></div>
                      <div class="l-task-bg">
                        <div class="l-task">
                          <div class="t-inner task-inner cr-pointer">
                            <span class="drag" draggable="true">
                              <svg-icon icon-class="drag" class="i-4 i-mic"></svg-icon>
                            </span>
                            <span class="t-check check-toggle cr-pointer">
                              <span class="checker avoid-event">
                                <svg-icon icon-class="checkbox" class="i-tny i-4"></svg-icon>
                              </span>
                            </span>
                            <div class="tips line-right">
                              <span class="tip project-hint show">
                                <i class="project-color" style="background-color: transparent;"></i><span
                                class="project-name text-tny">收集箱</span></span><span class="tip date-hint t-date show"><span
                                class="due-date text-tny duedate-overdue">昨天</span></span></div>
                            <div class="title-wrap">
                              <div class="inline-editor word-nowrap title transition text-def typeahead line-left">
                                <div contenteditable="true">2</div>
                              </div>
                            </div>
                          </div>
                          <div class="t-menu-toggle"><a>
                            <svg class="icon-more-for-task i-1">
                              <use xlink:href="#more-for-task"></use>
                            </svg>
                          </a></div>
                          <div class="content-print">
                            <div class="t-content"></div>
                            <div class="t-desc"></div>
                            <div class="t-subtask"></div>
                          </div>
                        </div>
                      </div>
                      <div class="t-line bottom"></div>
                      <div class="drag-help task ui-sortable-helper hide"
                           style="position: absolute; top: 0px; z-index: -1;"></div>
                    </li>
                  </ul>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'TaskList',

    data() {
      return {
        checkDate: '2020',
        focus: false,
        customStyle: 'background: #fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
        text: '222',
      }
    },
    computed: {
      ...mapGetters(["getTodos", "getUserData", 'todoNav', 'routeQuery']),
      title(){
        return this.todoNav.find(f=> f.key === this.routeQuery.filter).name
      }
    },
    methods: {
      focusInput() {
        this.focus = true
        setTimeout(()=>{
          this.$refs.input.focus()
        }, 0)
        console.log();
      },
      blur(){
        // this.focus = false
      }
    },
    mounted() {
      this.routeQuery = this.$route.query
    }
  }
</script>

<style lang="scss">
  .focus{

  }


  #add-task{
    .task-header{
      cursor: pointer;
      overflow: hidden;
      position: relative;
      padding: 0 28px 0 26px;
    }
    .task .l-task-bg{
      margin: 0;
    }
    &.tl-quick{
      .task-input{
        height: 40px;
        padding-left: 12px;
        padding-right: 12px;
        font-size: 14px;
        overflow: hidden;
        /*border-color: #fff;*/
      }
      .tl-q-preset{
        display: flex;
        right: 0;
        top: 8px;
      }
    }
    .CodeMirror{
      height: 20px;
      line-height: 20px;
      padding: 9px 0;
      box-sizing: content-box;
      pre{
        color: rgba(0,0,0,.36);
      }
    }
    input.ant-input{
      height: 38px;
      outline: none;
      background-color: unset;
      border: none;
    }
    input.ant-input:focus{
      box-shadow: none; // 注意聚焦之后边框存在这个属性
    }
  }

</style>
