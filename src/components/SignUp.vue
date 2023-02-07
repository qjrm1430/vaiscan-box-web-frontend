<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
export default {
  setup() {
    const inputRef = ref();
    const id = ref();
    const name = ref();
    const password = ref();
    const rpassword = ref();
    return {
      id,
      name,
      password,
      rpassword,
      isPwd: ref(true),
      isrPwd: ref(true),
      inputRef,

      onSubmit() {
        const data = {
          alias: name.value,
          username: id.value,
          password: password.value
        };
        api.post('/auth/signup', data).then(() => {
          self.$router.push({ path: '/signin/username' });
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
        <q-img src="src/assets/HamTop.svg" class="top" />
        <div class="ahaa">Create Your Account</div>
        <div class="ahaa" style="margin-bottom: 10px">
          Already have an account?
          <router-link to="/login" class="link">Login</router-link>
        </div>
        <q-form @submit="onSubmit">
          <q-input
            dark
            ref="inputRef"
            filled
            v-model="name"
            label="Name"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
            style="margin-bottom: 8px"
          />
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
          <q-input
            dark
            v-model="rpassword"
            filled
            label="Repeat Password"
            :type="isrPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => val == password || 'The Password does mot match.'
            ]"
            style="margin-bottom: 8px"
          >
            <template v-slot:append>
              <q-icon
                :name="isrPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isrPwd = !isrPwd"
              />
            </template>
          </q-input>
          <q-btn no-caps label="Create Account" type="submit" class="submit" />
        </q-form>
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
</style>
