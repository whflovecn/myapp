<template>
  <q-list bordered>
      <!-- 生成折叠菜单目录 -->
    <q-expansion-item
      v-for="(group, index) in menuObj"
      group="menu"
      :icon="group.icon"
      :label="group.title"
      header-class="text-primary"
      :default-opened="index === 0"
    >
      <q-card>
        <q-card-section>
            <!-- 生成菜单项目 -->
          <q-list class="rounded-borders text-primary" @click="openfun($event)">
            <q-item
              v-for="(item, index) in group.items"
              :to="item.to"
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = item"
              :rel="item.id"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>{{ item.title }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
<script>
import bus from "../../eventBus";

export default {
  props: ["menuObj"],
  data() {
    return {
      link: {},
      index: 1
    };
  },
  methods: {
    openfun(e) {
      bus.$emit("addTab", this.link);
    }
  }
};
</script>

<style lang="sass" scoped>
.my-menu-link
  color: #ff8f00 !important;
  background: #e3f2fd!important
</style>