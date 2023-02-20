<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const hash = ref('awv34va3vv3ba3bb3ag4a934n3');
    const title = ref('졸려뒤지겐네');
    const size = ref('123.02 MB');
    const trid = ref('JFIF JPEG bitmap (50%)');
    const type = ref('jpeg');
    const capType = type.value.toUpperCase();
    const flag = ref(true);
    return {
      hash,
      title,
      size,
      trid,
      capType,
      flag
    };
  }
};
</script>
<template>
  <div class="q-ma-xl column item-start justify-center">
    <div class="row items-center">
      <q-space />
      <div class="type flex flex-center">{{ capType }}</div>
      <q-space />
      <div class="box row justify-between items-center">
        <q-space />

        <div class="column">
          <span class="redflag" v-if="flag">
            Our AI machine flagged this file as malicious
          </span>
          <span class="greenflag" v-else>
            Our AI machine didn't flag this file as malicious
          </span>

          <div class="row main">Hash <q-space /> {{ hash }}</div>
          <div class="row main">Title <q-space /> {{ title }}</div>
        </div>
        <q-space />
        <q-separator dark vertical inset class="q-mx-lg" />
        <div class="column">
          <span class="main q-mb-sm">Size</span>
          <div class="main">{{ size }}</div>
        </div>
        <q-separator dark vertical inset class="q-mx-lg" />
        <div class="column">
          <span class="main q-mb-sm">TRID</span>
          <div class="main">{{ trid }}</div>
        </div>
        <q-space />
      </div>
    </div>
    <span class="q-ma-md title">Security analysis</span>
  </div>
</template>
<style lang="scss" scoped>
.type {
  width: 128px;
  height: 64px;
  border-radius: 6px;
  border: solid 2px #2c2c34;
  font-family: AppleSDGothicNeoEB00;
  font-size: 30px;
  color: #f9f9fd;
}
.box {
  width: 904px;
  height: 128px;
  border: solid 1px #2c2c34;
  background-color: #1a1a1a;
}
.greenflag {
  font-family: AppleSDGothicNeoB00;
  font-size: 22px;
  color: #009a62;
}
.redflag {
  font-family: AppleSDGothicNeoB00;
  font-size: 22px;
  color: #d54e48;
}
.main {
  font-family: AppleSDGothicNeoR00;
  font-size: 14px;
  color: #f9f9fd;
}
.title {
  font-family: AppleSDGothicNeoR00;
  font-size: 26px;
  text-align: left;
  color: #f9f9fd;
}
</style>
