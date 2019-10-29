<template>
  <!-- logo -->
  <q-toolbar
    class="shadow-4 q-my-md "
    :style="{ margin: '0px 0px 2px 0px', padding: '0px', height: '100px' }"
  >
  <!-- 这部分是Logo -->
    <div :style="{ width: '300px', height: '100px' }">
      <q-img
        src="http://img.ph8ad.com/baidu/11111118.jpg"
        class="col-3"
        :style="{ width: '300px', height: '100px' }"
      />
    </div>

    <!-- 子系统 面板-->
    <div :style="{ width: subSysTabWidth }">
      <q-tabs
        v-model="active"
        dense
        align="right"
        active-bg-color="blue-5"
        active-color="white"
        indicator-color="blue-7"
        :style="{ height: '100px' }"
        @click="openSubSys($event)"
      >
        <q-tab
          v-for="(subsys, index) in subSysList"
          :name="subsys.name"
          :icon="subsys.icon"
          :label="subsys.title"
        />
      </q-tabs>
    </div>

    <!-- 待办事项、消息、设置、用户 -->
    <div class="row" style="width:300px;height:70px;line-height:70px;">
      <div class="col-1"></div>

      <!-- 待办事项 -->
      <div class="col-2">
        <q-btn
          round
          fab-mini
          class="bg-light-blue-10"
          @click="openDlg('todo', 'right')"
          icon="list"
        >
          <q-badge v-show="$store.state.todoList" color="red" floating>{{
            $store.state.todoList.length
          }}</q-badge>
        </q-btn>
      </div>

      <!-- 消息 -->
      <div class="col-2">
        <q-btn
          round
          fab-mini
          class="bg-green-14"
          icon="textsms"
          @click="openDlg('msg', 'right')"
        >
          <q-badge v-show="$store.getters.msgCount" color="red" floating>
              {{$store.getters.msgCount}}
          </q-badge>
        </q-btn>
      </div>

      <!-- 设置 -->
      <div class="col-2">
        <q-btn round fab-mini class="bg-amber-8" icon="settings">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">系统设置</div>
                <q-toggle v-model="setting.msg" label="屏蔽消息声音" />
                <q-toggle v-model="setting.todo" label="屏蔽待办事项" />
                <q-toggle v-model="setting.mini" label="默认迷你菜单" />
                <q-toggle v-model="setting.full" label="全屏显示" />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>

      <!-- 用户 -->
      <div class="col-4">
        <q-avatar rounded size="70px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <!-- 用户菜单 -->
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">变更角色</div>
                <q-list  bordered separator>
                    <!-- 角色列表 -->
                  <q-item
                    v-for="contact in contacts"
                    :key="contact.id"
                    class="q-my-sm"
                    v-ripple
                    clickable 
                     tag="label"
                      push v-close-popup 
                  >
                    <q-item-section avatar>
                      <q-icon name="stars" size='40px' color="blue" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ contact.name }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-radio v-model="role" :val="contact.id"/>
                    </q-item-section>

                  </q-item>
                  
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
                <!-- 注销按钮 -->
                <q-btn color="primary" label="注销" push v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-avatar>
      </div>
      <div class="col-1"></div>
    </div>
  </q-toolbar>
</template>

<script>
const contacts = [
  {
    id: 1,
    name: "Ruddy Jedrzej",
    email: "rjedrzej0@discuz.net",
    letter: "R"
  },
  {
    id: 2,
    name: "Mallorie Alessandrini",
    email: "malessandrini1@marketwatch.com",
    letter: "M"
  }
];

export default {
  props: ["subSysList"],
  data() {
    return {
      setting: {  //设置
        msg: false,
        todo: false,
        mini: false,
        full: false
      },
      active: this.subSysList[0].name, //当前激活子系统
      role:'',
      contacts
    };
  },
  computed: {
    subSysTabWidth() {
      let w = document.documentElement.clientWidth;
      return w - 600 + "px";
    }
  },
  methods: {
    openDlg(dlg, position) {
      console.log(position);
      this.$emit("openDialog", dlg, position);
    },
    openSubSys(e) {
      console.log(this.active);
    }
  },
  watch: {
    "setting.full"(val) {
      if (val) {
        this.$q.fullscreen.request();
      } else {
        this.$q.fullscreen.exit();
      }
    }
  }
};
</script>