<script lang="ts">
import {} from 'vue';
</script>
<template>
  <q-layout style="background-color: #121214">
    <div class="flex flex-center column q-pa-xl">
      <q-img
        src="src\assets\MainLogo.svg"
        style="width: 214px; height: 57.76px"
        class="q-my-xl"
      />
      <q-img
        src="src\assets\ErrorBox.svg"
        style="width: 200px; height: 200px"
        class="q-mt-xl"
      />
      <span class="main q-mt-lg"> Here is the Error! </span>
      <span class="sub"> Error Code : 404</span>
    </div>
  </q-layout>
</template>
<style lang="scss" scoped>
.main {
  font-family: AppleSDGothicNeoEB00;
  font-size: 32px;
  color: #f9f9fd;
}
.sub {
  font-family: AppleSDGothicNeoEB00;
  font-size: 16px;
  color: #f9f9fd;
}
</style>
