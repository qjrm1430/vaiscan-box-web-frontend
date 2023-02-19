<script lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  data() {
    return {
      username: ''
    };
  },
  setup() {
    const inputRef = ref();
    const password = ref();
    const router = useRouter();
    const $q = useQuasar();

    return {
      password,
      isPwd: ref(true),
      inputRef,
      onSubmit() {
        const data = {
          password: password.value
        };
        api.post('/auth/signin/password', data).then((res) => {
          $q.cookies.remove('connect.sid');
          $q.cookies.set('accessToken', res.data.accessToken);
          $q.cookies.set('name', res.data.alias);

          router.push({ path: '/storage' });
        });
      },
      reset() {
        inputRef.value.resetValidation();
      }
    };
  },
  mounted() {
    const router = useRouter();
    api
      .get('/auth/signin/password')
      .then((res) => {
        this.username = res.data;
      })
      .catch(() => {
        router.push({ path: '/signin/username' });
      });
  }
};
</script>
<template>
  <div class="q-pa-xl flex flex-center">
    <q-card class="dark q-px-xl q-py-lg" style="background-color: #1a1a1a">
      <q-card-section align="center">
        <q-img src="src/assets/LoginHamTop.svg" class="top" />
        <div class="ahaa" style="margin-bottom: 10px">
          Welcome! <span style="color: powderblue">{{ username }}</span>
        </div>
        <div>
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
            <q-btn no-caps label="Continue" type="submit" class="submit" />
          </q-form>
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
