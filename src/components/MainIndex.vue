<script setup lang="ts">
import {} from 'vue';
</script>
<template>
  <div class="flex flex-center column">
    <div class="q-my-xl">
      <q-img
        src="src\assets\MainLogo.svg"
        style="min-width: 345px; height: 96px"
      />
    </div>
    <div class="q-my-xl">
      <span class="main">
        Analyse suspicious files to detect malware and other breaches.
      </span>
    </div>
    <div>
      <q-img
        src="src\assets\SearchFile.svg"
        style="width: 128px; height: 128px"
      />
    </div>
    <div class="q-ma-md">
      <q-btn icon="search" label="Choose file to scan" class="button" />
    </div>
    <div style="max-width: 710px" class="q-my-xl">
      <span class="main">
        By submitting data above, you are agreeing to our Terms of Service and
        Privacy Policy, and to the sharing of your Sample submission with the
        security community. Please do not submit any personal information; Black
        Whopper is not responsible for the contents of your submission.
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 416px;
  height: 19px;
  font-family: AppleSDGothicNeoM00;
  font-size: 16px;
  color: #585d6e;
}
.button {
  border-radius: 5px;
  font-family: AppleSDGothicNeoB00;
  font-size: 14px;
  color: #ebebf1;
  background-color: #7f7aee;
}
</style>
