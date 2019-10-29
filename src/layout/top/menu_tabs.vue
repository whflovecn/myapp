<template>
  <q-toolbar
    class="shadow-1 bg-amber-9"
    :style="{ padding: '0px 12px 0px 0px' }"
  >
    <q-toolbar
      class="bg-amber-10"
      :style="{ width: mini == true ? '60px' : '300px' }"
    >
      <q-toolbar-title v-show="!mini">
        功能菜单
      </q-toolbar-title>
      <!-- showLeft是附加到下面的左侧侧滑面板的模型-->
      <q-btn flat round dense @click="miniMenu()" icon="menu" />
    </q-toolbar>

    <q-toolbar-title>
        <!-- q-tab 是打开页面的面板 -->
      <q-tabs
        v-model="selectedTab"
        inline-label
        dense
        indicator-color="yellow"
        align="left"
        ref="maintabs"
      >
        <q-route-tab
          v-for="(tab, index) in tabList"
          :to="tab.to"
          :icon="tab.icon"
          :label="tab.title"
          :rel="tab.id"
          exact
        >
        <!-- 由于无法增加[x]按钮实现关闭操作，所以使用菜单实现 -->
          <q-menu touch-position context-menu auto-close>
            <q-list
              dense
              style="min-width: 100px"
              @click="tabContextMenu($event, index)"
            >
              <q-item clickable v-close-popup>
                <q-item-section>关闭</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>全部关闭</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>关闭右侧</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>关闭其他</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-route-tab>
      </q-tabs>
    </q-toolbar-title>
  </q-toolbar>
</template>
<script>
import bus from "../../eventBus";
export default {
  data() {
    return {
      tabList: [],
      mini: false,
      miniWidth: 50,
      selectedTab: ""
    };
  },
  methods: {
    miniMenu() {
      console.log("mini", this.mini);
      this.mini = !this.mini;
      this.$emit("isMiniMenu", this.mini);
    },
    tabContextMenu(e, index) {
      switch (e.target.innerText) {
        case "关闭":
          this.tabList.splice(index,1);
          break;
        case "全部关闭":
          this.tabList = [];
          break;
        case "关闭右侧":
          this.tabList.splice(index+1);
          break;
        case "关闭其他":
          this.tabList=[this.tabList[index]];
          break;
        default:
          this.tabList.splice(index,1);
      }
    }
  },
  mounted() {
    var self = this;
    bus.$on("testEvent", function(msg) {
      console.log(msg);
    });
    bus.$on("addTab", function(obj) {
      let isExist = true;
     self.tabList.find(function(item){
         if (obj.id==item.id){
             isExist = false;
         }
     })
      if (isExist) {
        self.tabList.push(obj);
      }
    });
  }
};
</script>