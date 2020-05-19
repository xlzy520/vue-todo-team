export default {
  userData: [

  ],
  temp: '',
  data: [],
  todos: [
    { "completed": false, "id": 201, "title": "尝试还能不能完成picgo插件", "description": null, "inDate": "5月18日", "priority": "Low", "tags": [{ "name": "Personal", "color": "rgb(102, 204, 255)" }], "priorityColor": "#5e72e4" },
    { "completed": false, "id": 202, "title": "支持账号密码登陆保存", "description": "hhhhh哈哈哈哈哈哈哈哈哈哈哈", "inDate": "5月10日", "priority": "High", "tags": [{ "name": "Home", "color": "rgb(255, 203, 0)" }, { "name": "Personal", "color": "rgb(102, 204, 255)" }], "priorityColor": "#f5365c" },
    { "completed": false, "id": 203, "title": "云数据库化", "description": null, "inDate": "5月10日", "priority": "Medium", "tags": [{ "name": "Home", "color": "rgb(255, 203, 0)" }], "priorityColor": "#ffbb33" }
  ],
  allTags: [
    {
      name: "Home",
      color: "rgb(255, 203, 0)"
    },
    {
      name: "Personal",
      color: "rgb(102, 204, 255)"
    },
    {
      name: "Work",
      color: "rgb(162, 93, 220)"
    }
  ],
  defaultTagColor: "rgb(128, 128, 128)",
  colorPalete: [
    "#00C821",
    "#9CD326",
    "#CAB641",
    "#FFCB00",
    "#784BD1",
    "#A25DDC",
    "#0086C0",
    "#579BFC",
    "#66CCFF",
    "#BB3354",
    "#E2445C",
    "#FF158A",
    "#FF5AC4",
    "#FF642E",
    "#FDAB3D",
    "#7F5347",
    "#C4C4C4",
    "#808080",
    "#333333"
  ],
  todoNav: [
    {name: '所有', icon: 'all-list', key: 'all'},
    {name: '已完成', icon: 'completed-list', key: 'completed'},
    {name: '垃圾桶', icon: 'delete-list', key: 'delete'},
  ],
  routeQuery: {
    filter: 'all',
    isTag: 0
  }
}
