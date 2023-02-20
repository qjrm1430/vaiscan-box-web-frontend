<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const loginstatus = ref(-1);
    const $q = useQuasar();
    const username = $q.cookies.get('name');
    return {
      leftDrawerOpen,
      loginstatus,
      username,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  created() {
    const $q = useQuasar();

    if ($q.cookies.has('accessToken')) this.loginstatus = 1;
    else this.loginstatus = 0;
  },
  methods: {
    logout() {
      api.post('/auth/signout').then(() => {
        console.log('logout');
        window.location.reload();
      });
    }
  }
};
</script>

<template>
  <q-layout view="lHh lpr lFf" style="background-color: #121214">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="260"
      side="left"
      class="my-custom-alignment column"
      style="background-color: #202027"
      flex
      flex-center
    >
      <!-- drawer content -->
      <q-img
        src="src/assets/Logo.svg"
        class="q-my-md self-center"
        style="max-width: 60%"
      />

      <q-separator dark />

      <q-btn flat class="q-my-md" v-if="loginstatus == 1">
        <span class="login"> {{ username }} </span>
        <q-menu anchor="bottom middle" self="top middle">
          <q-item clickable @click="logout()">
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn
        flat
        to="/signin/username"
        class="q-my-md"
        v-else-if="loginstatus == 0"
      >
        <q-img src="src/assets/Login.svg" style="max-width: 30%" />
      </q-btn>

      <q-separator dark />

      <div class="row q-pa-sm q-py-md self-center">
        <q-btn flat to="/storage">
          <q-img src="src/assets/Box.svg" style="width: 64px; height: 26px" />
        </q-btn>
        <q-separator dark vertical class="q-mx-lg" />
        <q-btn disable flat to="/signin/username">
          <q-img
            src="src/assets/CheckScan.svg"
            style="width: 64px; height: 22px; margin-top: 4px"
          />
        </q-btn>
      </div>

      <q-separator dark />
    </q-drawer>

    <q-page-container align="center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.my-custom-alignment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  font-family: AppleSDGothicNeoB00;
  font-size: 20px;
  color: #ebebf1;
}
</style>
