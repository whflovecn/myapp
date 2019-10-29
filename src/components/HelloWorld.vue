<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-time v-model="time" />

        <q-time v-model="timeWithSeconds" with-seconds />
      </div>
    </div>

<div class="q-gutter-sm row">
      <q-input filled v-model="time" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="time" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input filled v-model="timeWithSeconds" mask="fulltime" :rules="['fulltime']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="timeWithSeconds"
                with-seconds
                format24h
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="q-pa-md" style="max-width: 300px">
      <q-input filled v-model="date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="slide-down" transition-hide="slide-down">
                <!-- fade  slide-down -->
              <q-date v-model="date" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-date v-model="date" />

      <q-date
        v-model="date"
        minimal
      />
    </div>
  </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
        time: '10:56',
      timeWithSeconds: '09:24:10',
      date: '2019-02-01 12:44'
    };
  }
};
</script>
