<template>
  <q-layout
    view="hHh lpR lFf"
    :style="{ width: '360px' }"
    class="bg-grey-3"
    container
    ref="msgDlg"
  >
  <!-- 聊天内容标题 -->
    <q-header :style="{ height: '60px', lineHeight: '60px' }">
      <q-toolbar>
          <!-- 返回聊天列表按钮 -->
        <q-btn
          flat
          @click="isShowUsers = !isShowUsers"
          round
          dense
          icon="keyboard_arrow_left"
          class="bg-blue-5"
        >
        <!-- 聊天列表中未读消息数量 -->
          <q-badge color="red" v-show="$store.getters.msgCount" floating>{{$store.getters.msgCount}}</q-badge>
        </q-btn>
        <q-toolbar-title class=" text-center">
            <!-- 用户头像 -->
          <q-avatar size="48px">
            <img :src="session.avatar" />
          </q-avatar>
          {{ session.name }}
        </q-toolbar-title>
        <!-- [+]按钮，用来增加人员形成群聊 -->
        <q-btn
          flat
          round
          dense
          icon="add_add"
          class="bg-blue-5"
        >
        </q-btn>
        
      </q-toolbar>
    </q-header>
    <!-- 消息列表 -->
    <q-drawer show-if-above v-model="isShowUsers" :width="360" bordered>
      <q-list
        bordered
        separator
        class="rounded-borders"
        style="max-width: 359px;width:100%"
      >
      <q-toolbar class="bg-primary" style="color:#fff" header>
          <q-toolbar-title>系统消息</q-toolbar-title>
          <q-btn flat round icon="close" v-close-popup />
        </q-toolbar>
        <q-item
          v-for="group in $store.state.msgList.groups"
          @click="selectItem(group)"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="group.avatar" />
              <q-badge color="red" v-show="group.unread > 0" floating>{{
                group.unread
              }}</q-badge>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ group.name }}</q-item-label>
            <q-item-label caption lines="2">
              {{ group.text }}
            </q-item-label>
          </q-item-section>
          <q-separator inset="item" />
        </q-item>

        <q-toolbar class="bg-primary" style="color:#fff" header v-if="$store.state.msgList.groups">
          <q-toolbar-title>群组</q-toolbar-title>
          <q-btn flat round dense class="bg-blue-5" icon="group_add" />
        </q-toolbar>
        <q-item  v-if="$store.state.msgList.groups"
          v-for="group in $store.state.msgList.groups"
          @click="selectItem(group)"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="group.avatar" />
              <q-badge color="red" v-show="group.unread > 0" floating>{{
                group.unread
              }}</q-badge>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ group.name }}</q-item-label>
            <q-item-label caption lines="2">
              {{ group.text }}
            </q-item-label>
          </q-item-section>
          <q-separator inset="item" />
        </q-item>

        <q-toolbar class="bg-primary" style="color:#fff" header  v-if="$store.state.msgList.users">
          <q-toolbar-title>好友</q-toolbar-title>
          <q-btn flat round dense class="bg-blue-5" icon="person_add" />
        </q-toolbar>
        <q-item  v-if="$store.state.msgList.users" v-for="user in $store.state.msgList.users" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img :src="user.avatar" />
              <q-badge color="red" v-show="user.unread > 0" floating>{{
                user.unread
              }}</q-badge>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ user.name }}</q-item-label>
            <q-item-label caption lines="2">
              {{ user.text }}
            </q-item-label>
          </q-item-section>
          <q-separator inset="item" />
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        :style="{
          height: height,
          maxWidth: '360px',
          width: '360px',
          padding: '0px 15px'
        }"
        ref="list"
      >
        <q-chat-message
          v-for="msgs in session.msgs"
          :name="msgs.user"
          :avatar="msgs.avatar"
          :text="[msgs.text]"
          :sent="msgs.sent"
          :stamp="msgs.time"
          bg-color="#eee !important"
        />
      </q-scroll-area>
    </q-page-container>
    <q-footer :style="{ height: '260px' }" class="bg-white">
      <q-toolbar
        :style="{ height: '50px', minHeight: '50px', paddingTop: '10px' }"
      >
        <q-btn
          color="blue"
          dense
          flat
          size="16px"
          icon="sentiment_satisfied_alt"
          @click="emojShow = !emojShow"
        >
          <q-menu anchor="top left" self="bottom left">
            <q-card style="width: 340px">
              <VEmojiPicker
                :pack="emojisNative"
                :showSearch="false"
                labelSearch="Search"
                :style="{ width: '340px' }"
                @select="onSelectEmoji"
              />
            </q-card>
          </q-menu>
        </q-btn>
        <q-btn color="blue" dense flat size="16px" icon="folder" />
        <q-btn color="blue" dense flat size="16px" icon="textsms" />
      </q-toolbar>
      <div
        ref="editDiv"
        class="edit"
        contenteditable="true"
        plaintext-only="false"
        @paste="handlePaste($event)"
        @keyup.enter.ctrl="send()"
      ></div>
      <div style="padding:0px 10px;float:right ">
        <q-btn
          color="blue"
          icon-right="send"
          label="发送"
          @click="send($event)"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import "./msg.scss";
import VEmojiPicker from "v-emoji-picker";
import packEmoji from "v-emoji-picker/data/emojis.js";
import { date } from "quasar";
export default {
  components: {
    VEmojiPicker
  },
  data() {
    return {
      isShowUsers: true,
      height: "",
      emojShow: false,
      session: {}
    };
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
  },
  mounted() {
    //   根据页面调整高度
    this.height = this.$refs.msgDlg.$el.clientHeight - 260 - 60 + "px";
  },
  watch: {
    "session.msgs"(val, old) {
        // 监听session.msgs，并自动修改store
      this.$store.commit("update", this.session);
    }
  },
  methods: {
    selectItem(item) {
        // 每当点开列表后，都自动清零未读数
      item.unread = 0;
      this.session = item;
      this.isShowUsers = false;
    },
    send(e) {
        //发送按钮
      let div = this.$refs.editDiv;  //获取聊天框对象
      let list = this.$refs.list.$el.children[0];  //获取聊天展示框对象，为后面实现自动滚动至最下面做准备
      let text = div.innerHTML;
      if (text != "") {  //无内容不发送
        let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
        let msg = {
          user: "whf",
          sent: false,
          avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
          time: formattedString,
          text: text
        };
        this.session.msgs.push(msg);
        setTimeout(() => {
            // 自动滚动至最下面
          list.scrollTop = list.scrollHeight;
        }, 0);
        // 清空聊天框
        div.innerHTML = "";
      }
    },
    onSelectEmoji(dataEmoji) {
        // 选择表情
      this.$refs.editDiv.innerHTML += dataEmoji.emoji;
    },
    handlePaste(event) {
      // 禁止粘贴默认事件
      event.preventDefault();
      let clipboardData;
      // IE浏览器内clipboardData在window下不在event内
      if (window.clipboardData && window.clipboardData.setData) {
        clipboardData = window.clipboardData;
      } else {
        clipboardData = (event.originalEvent || event).clipboardData;
      }
      // 粘贴板没内容时退出
      if (!clipboardData) return;

      // 现代浏览器的clipboardDat内会存在items数组，代表粘贴板的内容
      if (!!clipboardData.items) {
        const items = clipboardData.items;
        if (!items.length) return;
      }

      // 通过clipboardData.getData('text')获取粘贴板的富文本内容
      const content = clipboardData.getData("text") || "";
      // 通过正则处理掉富文本标签
      const text = content.replace(/<[^>]*>/g, "");
      this.$refs.editDiv.innerHTML += text;
    }
  }
};
</script>


