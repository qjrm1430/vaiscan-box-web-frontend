<template>
  <q-layout view="lHh lpr lFf" style="background-color: #121214">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      style="background-color: #202027"
      justify-center
    >
      <!-- drawer content -->
      <q-item>
        <q-img
          src="src/assets/Logo.svg"
          class="q-my-md q-mx-lg"
          style="max-width: 80%"
        />
      </q-item>

      <q-separator dark />

      <q-item>
        <q-img
          src="src/assets/Login.svg"
          class="q-my-md"
          style="max-width: 35%; margin-left: 82px"
        />
      </q-item>

      <q-separator dark />

      <q-item class="q-ma-md">
        <q-img
          src="src/assets/Box.svg"
          class="q-ml-md"
          style="width: 78px; height: 32px"
        />
        <q-separator dark vertical class="q-mx-lg" />
        <q-img
          src="src/assets/CheckScan.svg"
          style="width: 78px; height: 26px; margin-top: 5px"
        />
      </q-item>
      <q-separator dark />
    </q-drawer>

    <q-page-container align="center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
};
</script>
