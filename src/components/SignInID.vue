<script lang="ts">
import { ref } from 'vue';
// import axios from 'axios';

export default {
  data() {
    return {
      id: ''
    };
  },
  setup() {
    const inputRef = ref();

    return {
      inputRef,
      onSubmit() {
        //
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
          Don't have an account?
          <router-link to="/signup" class="link">Sign up</router-link>
        </div>
        <div>
          <q-form @submit="onSubmit">
            <q-input
              dark
              ref="inputRef"
              filled
              v-model="id"
              label="ID"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
              style="margin-bottom: 8px"
            />
            <q-btn no-caps label="Continue" type="submit" class="submit" />
          </q-form>
        </div>

        <q-separator dark class="q-ma-md" />

        <div>
          <q-btn
            no-caps
            label="Sign in with Kakao"
            type="submit"
            class="kakao"
          />
        </div>
        <div>
          <q-img src="src/assets/HamBottom.svg" class="bottom" />
        </div>
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
.link {
  font-family: AppleSDGothicNeoL00;
  font-size: 18px;
  color: #398aff;
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
