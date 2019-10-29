<template>
  <div>
    <q-layout view="hHr LpR fFf">
      <q-header elevated>
        <HeaderLogo :subSysList="subSysList" @openDrawer="openDrawer" />
        <MenuTabs @isMiniMenu="isMiniMenu" />
      </q-header>
      <q-drawer
        v-model="leftDrawerOpen"
        :width="300"
        :mini="isMini"
        :mini-width="60"
        bordered
        content-class="bg-grey-2"
      >
        <Menu :menuObj="menuObj" />
      </q-drawer>
      <q-page-container>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </q-page-container>
      <!-- <q-dialog v-model="dialog" seamless :position="position">
      <MsgDialog v-show="dialogTpl === 'msg'" />
      <TodoDialog v-show="dialogTpl === 'todo'" />
    </q-dialog> -->
    </q-layout>
    <Drawer
      title="Hello, I'm drawer"
      :display.sync="displayDrawer"
      :width="drawerWidth"
    >
      <!-- <p>1. Hello, world!</p>
      <p>2. Do you like it?</p>
      <button class="btn try" @click="changeWidth">点我试试?</button> -->
      <MsgDialog v-show="dialogTpl === 'msg'" />
      <TodoDialog v-show="dialogTpl === 'todo'" />
    </Drawer>
  </div>
</template>
<script>
import HeaderLogo from "./top/header";
import MenuTabs from "./top/menu_tabs";
import Menu from "./left/menu";
import MsgDialog from "./right/msg";
import TodoDialog from "./right/todo";
import Drawer from "../components/drawer";
export default {
  data() {
    return {
      displayDrawer: false,
      drawerWidth: "500px",
      leftDrawerOpen: this.$q.platform.is.desktop,
      isMini: false,
      dialogTpl: "msg",
      subSysList: [
        { icon: "mail", name: "mail", title: "首页" },
        { icon: "list", name: "list", title: "列表" }
      ],

      menuObj: [
        {
          group: "1",
          title: "测试1",
          icon: "mail",
          items: [
            {
              id: 1,
              title: "首页",
              to: "/helloworld",
              name: "home",
              icon: "mail"
            },
            { id: 2, title: "电影", to: "/todo", name: "movie", icon: "movie" },
            { id: 3, title: "空白页", to: "/abc", name: "kong", icon: "list" }
          ]
        },
        {
          group: "1",
          title: "测试1",
          icon: "mail",
          items: [
            {
              id: 4,
              title: "首页",
              to: "/helloworld",
              name: "home",
              icon: "mail"
            },
            { id: 5, title: "空白页", to: "/", name: "kong", icon: "list" }
          ]
        }
      ]
    };
  },
  methods: {
    changeWidth() {
      this.drawerWidth = this.drawerWidth === "500px" ? "800px" : "500px";
    },
    openDrawer(tpl) {
      this.dialogTpl = tpl;
      this.displayDrawer = true;
    },
    isMiniMenu(mini) {
      console.log("home", mini);
      this.isMini = mini;
    }
  },
  components: {
    HeaderLogo,
    MenuTabs,
    Menu,
    MsgDialog,
    TodoDialog,
    Drawer
  }
};
</script>

