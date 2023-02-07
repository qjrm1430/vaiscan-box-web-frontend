<script lang="ts">
import SignInPassword from 'src/components/SignInPassword.vue';
import { ref } from 'vue';

export default {
  components: {
    SignInPassword
  },
  setup() {
    const hasCookie = ref(false);

    const checkCookie = () => {
      hasCookie.value = document.cookie.indexOf('myCookie') !== -1;
    };

    checkCookie();

    return {
      hasCookie
    };
  }
};
</script>
<template>
  <q-page padding> <SignInPassword v-if="hasCookie" /> </q-page>
</template>
