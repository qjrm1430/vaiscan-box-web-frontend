<template>
  <q-page class="justify-evenly">
    <Main />
    <span class="CopyRight" style="bottom: 0">
      CopyRight ⓒ 2023 Black Whopper Team. All Rights Reserved
    </span>
  </q-page>
</template>
<script setup lang="ts">
import Main from 'src/components/MainIndex.vue';
</script>

<style lang="scss" scoped>
.CopyRight {
  font-family: AppleSDGothicNeoM00;
  font-size: 15px;
  color: #585d6e;
}
</style>
