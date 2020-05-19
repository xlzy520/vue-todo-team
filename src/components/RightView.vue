<template>
  <div id="right-view" :class="['g-right', { 'has-detail': content }]">
    <div class="empty-detail-wrapper" v-if="!content">
      <div class="empty-icon">
        <svg-icon icon-class="empty-box" class="empty-task-detail"></svg-icon>
      </div>
      <span class="empty-detail-view">点击任务标题查看详情</span></div>
    <div id="detail-view" class="b-h">
      <div id="task-detail-view" class="b-h">
        <div id="task-detail-inner" class="task-detail b-h">
          <div :class="['header', 'td-header', { 'checked': checked }]">
            <div class="toolbar td-bar">
              <div class="td-btns">
                <div class="btn-item td-check cr-pointer check-toggle">
                  <span class="checker avoid-event">
                    <svg-icon icon-class="completed-detail" class="i-4 i-sml"></svg-icon>
                    <svg-icon icon-class="checkbox-detail" class="i-4 i-sml"></svg-icon>
                    <svg-icon icon-class="subtask-detail" class="i-4 i-sml"></svg-icon>
                    <svg-icon icon-class="schedule-detail" class="i-4 i-sml"></svg-icon>
                    <svg-icon icon-class="subcalendar-detail" class="i-4 i-sml"></svg-icon>
                   </span>
                </div>
                <div class="btn-item timecard-wrap td-timecard">
                  <span id="preview" class="td-reminder cr-pointer active duedate-today">
                    <a
                      class="td-time timecard-trigger" id="quick-set"><span class="icons">
                      <svg-icon v-show="checkDate" icon-class="date-unselected" class="i-o-36 i-black normal-icon"></svg-icon>
                      <svg-icon v-show="!checkDate" icon-class="today-list" class="fill-theme active-icon i-5"></svg-icon>
                    </span>
                      <span class="selected-date i-5 text-tny">17</span>
                      <span id="quick-time" class="quick-time"></span>
                    </a>
                    <a class="td-preview timecard-trigger">
                      <span class="preview-duedate i-5">今天, 5月17日</span></a>
                  </span></div>
                <div class="btn-item priority-setting td-priority" v-show="false">
                  <div class="dropdown"><a class="insert-shadow priority-tip">
                    <svg-icon icon-class="priority-3" class="i-o-36 i-black"></svg-icon>
                  </a></div>
                  <div style="position: absolute; top: 0px; left: 0px; width: 100%;">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="body td-body b-h" style="padding-bottom: 0px;">
            <div class="content-editor" tabindex="-1">
              <div class="content td-content antiscroll-wrap">
                <div class="antiscroll-inner" id="content-view" style="height: 100%;">
                  <div id="td-caption" class="caption-section section td-caption">
                    <div class="switch-mode line-right">
                      <div class="avoid-event">
                        <svg class="icon-text-mode i-4 mode-text">
                          <use xlink:href="#text-mode"></use>
                        </svg>
                      </div>
                    </div>
                    <div id="tasktitle" class="line-left">
                      <div class="MDEditor title task-title"><textarea autocomplete="off" style="display: none;"
                                                                       class="pastable"></textarea>
                        <div class="CodeMirror cm-s-default CodeMirror-wrap">
                          <div
                              style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 0px;">
                            <textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0"
                                      style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;"
                                      class="pastable"></textarea></div>
                          <div class="CodeMirror-vscrollbar" tabindex="-1" cm-not-content="true"
                               style="width: 18px; pointer-events: none;">
                            <div style="min-width: 1px; height: 0px;"></div>
                          </div>
                          <div class="CodeMirror-hscrollbar" tabindex="-1" cm-not-content="true"
                               style="height: 18px; pointer-events: none;">
                            <div style="height: 100%; min-height: 1px; width: 0px;"></div>
                          </div>
                          <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                          <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                          <div class="CodeMirror-scroll" tabindex="-1">
                            <div class="CodeMirror-sizer"
                                 style="margin-left: 0px; margin-bottom: 0px; border-right-width: 30px; min-height: 24px; padding-right: 0px; padding-bottom: 0px;">
                              <div style="position: relative; top: 0px;">
                                <div class="CodeMirror-lines" role="presentation">
                                  <div role="presentation" style="position: relative; outline: none;">
                                    <div class="CodeMirror-measure"></div>
                                    <div class="CodeMirror-measure"></div>
                                    <div style="position: relative; z-index: 1;"></div>
                                    <div class="CodeMirror-cursors">
                                      <div class="CodeMirror-cursor" style="left: 0px; top: 0px; height: 19.2px;">
                                        &nbsp;
                                      </div>
                                    </div>
                                    <div class="CodeMirror-code" role="presentation">
                                      <pre class=" CodeMirror-line " role="presentation"><span role="presentation"
                                                                                               style="padding-right: 0.1px;">2222</span></pre>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                                style="position: absolute; height: 30px; width: 1px; border-bottom: 0px solid transparent; top: 24px;"></div>
                            <div class="CodeMirror-gutters" style="display: none; height: 54px;"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="estimated-pomo-wrapper"></div>
                  </div>
                  <div id="td-container" class="container-section">
                    <div id="td-editor" class="td-editor center-section" style="min-height: 246px;">
                      <div id="taskcontent" class="td-task-text b-h">
                        <div class="td-content editor-with-link">
                          <a-input></a-input>
                        </div>
                      </div>
                      <div id="detail-tag-view" class="section center-section clearfix detail-tag-view">
                        <div class="tag-list">
                          <div class="tag-item custom-color" style="background: rgba(159, 76, 239, 0.5);"><a
                              class="tag-name" style="color: rgba(46, 41, 51, 0.85);">test</a><a class="delete">
                            <svg class="icon-tag-close">
                              <use xlink:href="#tag-close"></use>
                            </svg>
                          </a></div>
                          <button class="add-tag fill-theme">
                            <svg class="icon-add">
                              <use xlink:href="#add"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="attachment-view" class="section center-section">
                      <div class="attachment-file">
                        <ul class="attachment-list"></ul>
                      </div>
                    </div>
                    <div id="location-view" class="section center-section"></div>
                    <div id="comments-view" class="section center-section"><p class="cm-handle"></p>
                      <div>
                        <div class="comments-hint">
                          <div class="comments-footer med-fast animated">
                            <div class="comment-holder hide">
                              <div class="last-comment antiscroll-wrap">
                                <div class="antiscroll-inner hide" style="height: 100%;"></div>
                                <div class="antiscroll-scrollbar antiscroll-scrollbar-vertical"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="section center-section"></div>
                  </div>
                </div>
                <div class="antiscroll-scrollbar antiscroll-scrollbar-vertical"
                     style="margin-top: 77px; height: 291px; top: 0px;"></div>
              </div>
            </div>
          </div>
          <div id="td-footer" class="under-footer td-footer">
            <div class="toolbar">
              <div class="td-item project-setting">
                <div class="project-settings-dropdown"><a>
                  <svg-icon icon-class="move-list" class="i-2-1 td-item-svg"></svg-icon>
                  <input type="button" readonly="" placeholder="List..." class="project" title="移动到" value="收集箱"></a>
                  <div style="position: absolute; top: 0px; left: 0px; width: 100%;">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="td-item td-item-delete"><a class="" title="删除">
                <svg-icon icon-class="td-footer-delete-list" class="i-2-1 fast-transition td-item-svg"></svg-icon>
              </a></div>
              <div class="dropup td-item more dropdown-custom" id="detail-footer-more"><a
                  class="dropdown-toggle power-tip" title="更多">
                <svg-icon icon-class="more-for-detail" class="i-2-1 fast-transition td-item-svg"></svg-icon>
              </a>
                <ul class="dropdown-menu  dropdown-menu-root dropdown-menu-vertical" role="menu"
                    aria-activedescendant="2" tabindex="0">
                  <li class="dropdown-menu-item" role="menuitem" aria-selected="false" style=""><a
                      id="task-add-tag-button">
                    <svg class="icon-detail-menu-tag i-3">
                      <use xlink:href="#detail-menu-tag"></use>
                    </svg>
                    <span>标签</span></a></li>
                  <li class="dropdown-menu-item" role="menuitem" aria-selected="false"><a>
                    <svg class="icon-attachment i-3">
                      <use xlink:href="#attachment"></use>
                    </svg>
                    <span>上传附件</span><input type="file" id="task-file-button" name="file" title=""
                                            style="color: transparent;"></a></li>
                  <li class="dropdown-menu-item" role="menuitem" aria-selected="false" style=""><a class="s-activity">
                    <svg class="icon-version-history i-3">
                      <use xlink:href="#version-history"></use>
                    </svg>
                    <span>任务动态</span></a></li>
                  <li class="dropdown-menu-item" role="menuitem" aria-selected="false"><a class="task-copy-link-button">
                    <svg class="icon-copy-task-link i-3">
                      <use xlink:href="#copy-task-link"></use>
                    </svg>
                    <span>复制任务链接</span></a></li>
                  <li class="dropdown-menu-item" role="menuitem" aria-selected="false"><a class="print">
                    <svg class="icon-print-in-list i-3">
                      <use xlink:href="#print-in-list"></use>
                    </svg>
                    <span>打印</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RightView',
    data() {
      return {
        content: '222',
        checked: true,
        checkDate: ''
      }
    }
  }
</script>

<style lang="scss">

</style>
