<script lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const hash = ref('');
    const title = ref('');
    const size = ref('');
    const risk = ref('');
    const type = ref('');
    const capType = ref('');
    const flag = ref(true);
    const route = useRoute();

    function onLoad() {
      api.get('result/' + route.query.hash).then((res) => {
        hash.value = res.data.hash;
        title.value = res.data.file_name;
        size.value = res.data.size;
        risk.value = res.data.risk;
        type.value = res.data.type;
        capType.value = type.value.toUpperCase();
      });
    }
    onMounted(() => {
      onLoad();
    });
    return {
      hash,
      title,
      size,
      risk,
      capType,
      flag,
      onLoad
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
          <span class="main q-mb-sm">RISK</span>
          <div class="main">{{ risk }}</div>
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
