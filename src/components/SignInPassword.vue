<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const inputRef = ref();
    const password = ref();

    return {
      password,
      isPwd: ref(true),
      inputRef,
      onSubmit() {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        });
      },
      reset() {
        inputRef.value.resetValidation();
      }
    };
  }
};
</script>
<template>
  <div class="q-pa-xl flex flex-center">
    <q-card class="dark q-px-xl q-py-lg" style="background-color: #1a1a1a">
      <q-card-section align="center">
        <q-img src="src/assets/LoginHamTop.svg" class="top" />
        <div class="ahaa" style="margin-bottom: 10px">
          Welcome!
          <router-link to="/signup" class="user">Sign up</router-link>
        </div>
        <q-item>
          <q-form @submit="onSubmit">
            <q-input
              dark
              v-model="password"
              filled
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) => !!val || 'Field is required',
                (val) =>
                  val.length >= 8 || 'Password must be at least 8 characters.'
              ]"
              style="margin-bottom: 8px"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn label="Continue" type="submit" class="submit" />
          </q-form>
        </q-item>
        <q-separator dark class="q-ma-md" />
        <q-item>
          <q-btn label="Sign in with Kakao" type="submit" class="kakao" />
        </q-item>
        <q-img src="src/assets/HamBottom.svg" class="bottom" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
.top {
  width: 360px;
  margin-bottom: 10px;
}
.bottom {
  margin-top: 10px;
}
.ahaa {
  font-family: AppleSDGothicNeoL00;
  font-size: 18px;
  color: #f7fdff;
}
.user {
  font-family: AppleSDGothicNeoL00;
  font-size: 18px;
  color: #808080;
}
.submit {
  width: 360px;
  font-family: AppleSDGothicNeoB00;
  background-color: #e27f46;
  font-size: 18px;
  color: #f7fdff;
}
.kakao {
  width: 360px;
  font-family: AppleSDGothicNeoB00;
  background-color: #ead02c;
  font-size: 18px;
  color: #f7fdff;
}
</style>
