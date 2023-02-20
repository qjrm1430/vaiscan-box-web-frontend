<script setup lang="ts">
import {} from 'vue';
</script>
<template>
  <div class="column centering">
    <q-spinner-ios size="7em" style="color: #ebebf1" />
    <span class="q-ma-md loading"> This file is being scanned... </span>
  </div>
</template>
<style lang="scss" scoped>
.centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.loading {
  font-family: AppleSDGothicNeoM00;
  font-size: 16px;
  color: #ebebf1;
}
</style>
