<template>
  <q-layout
    view="hHh lpR fFf"
    :style="{ width: '360px' }"
    class="bg-grey-3"
    container
    ref="msgDlg"
  >
    <q-header reveal class="bg-primary text-white" style="height:110px;">
      <q-toolbar>
        <q-toolbar-title>待办事项</q-toolbar-title>
        <q-btn flat round icon="close" v-close-popup />
      </q-toolbar>
      <div style="padding:0px 10px 10px 10px;" class="bg-grey-1">
        <q-input
          v-model="todoText"
          @keyup.enter="newTodo()"
          label="请输入文字后回车"
        >
          <template v-slot:before>
            <q-icon size="36px" name="event" />
          </template>

          <template v-slot:append>
            <q-btn round dense flat class="bg-blue-1" color="blue" icon="add" />
          </template>
        </q-input>
      </div>
    </q-header>
    <q-page-container>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        :style="{
          height: height,
          maxWidth: '360px',
          width: '360px',
          padding: '15px'
        }"
        ref="list"
      >
        <q-card
          v-for="todo in $store.state.todoList"
          :style="{ margin: '10px 0px' }"
        >
          <q-item :class="getLevel(todo.level)">
            <q-item-section avatar>
              <q-icon :name="todo.type" v-if="todo.type != 'assign'" />
              <q-avatar v-if="todo.type == 'assign'">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ utils.Omit(todo.title, 120) }}</q-item-label>
              <q-item-label caption>{{ todo.assign }}</q-item-label>
            </q-item-section>
            <q-item-section side flat>
              <div>
                <q-btn
                  v-if="todo.level == 2"
                  flat
                  round
                  color="white"
                  icon="done"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    完成
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="todo.level != 2"
                  flat
                  round
                  color="teal"
                  icon="done"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    完成
                  </q-tooltip>
                </q-btn>
                <q-btn flat round color="primary" icon="settings">
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    修改
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="todo.level == 5"
                  flat
                  round
                  color="white"
                  icon="delete"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    删除
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="todo.level != 5"
                  flat
                  round
                  color="red"
                  icon="delete"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    删除
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-card-section :style="{ padding: '10px' }" class="bg-grey-2">
            <div style="word-wrap:break-word">{{ todo.content }}</div>
            <div style="text-align:right;padding:0px 10px;">
              截止日期：{{ todo.end }}
            </div>
          </q-card-section>

          <!-- <q-card-actions align="around">
            
          </q-card-actions> -->
        </q-card>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import Utils from "../../utils";
export default {
  data() {
    return {
      utils: new Utils(),
      todoText: "",
      height: 0,
      date: "",
      scale: false
    };
  },
  mounted() {
    this.height = this.$refs.msgDlg.$el.clientHeight - 260 - 60 + "px";
  },
  methods: {
    newTodo() {
      let item = {
        type: "list",
        level: 1,
        title: "我的待办",
        content: this.todoText,
        assign: "我",
        end: date.formatDate(Date.now(), "YYYY-MM-DD") + " 18:00:00",
        start: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss")
      };
      this.$store.state.todoList.push(item);
    },
    getLevel(val) {
      switch (val) {
        case 1:
          return "text-black";
        case 2:
          return "bg-green text-white";
        case 3:
          return "bg-yellow text-blue";
        case 4:
          return "bg-orange text-white";
        case 5:
          return "bg-red text-white";
        default:
          return "text-black";
      }
    }
  },
  computed: {
    contentStyle() {
      return {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555"
      };
    },

    contentActiveStyle() {
      return {
        backgroundColor: "#eee",
        color: "black"
      };
    },

    thumbStyle() {
      return {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      };
    },
    emojisNative() {
      return packEmoji;
    }
  }
};
</script>