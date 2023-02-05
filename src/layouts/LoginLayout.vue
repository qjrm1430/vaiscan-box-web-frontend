<script setup lang="ts"></script>
<template>
  <q-layout class="login">
    <q-page-container align="center">
      <router-view />
      <span class="CopyRight">
        CopyRight ⓒ 2023 Black Whopper Team. All Rights Reserved
      </span>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.login {
  background-color: #121214;
}
.CopyRight {
  font-family: AppleSDGothicNeoM00;
  font-size: 15px;
  color: #585d6e;
}
</style>
