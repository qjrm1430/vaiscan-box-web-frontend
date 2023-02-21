<script lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  setup() {
    return {
      addbox: ref(false),
      search: ref(''),
      box: ref('')
    };
  },
  methods: {
    createBox() {
      api.post('storage/create', { name: this.box, path: '/' }).then(() => {
        window.location.reload();
      });
    }
  }
};
</script>
<template>
  <div class="q-pa-xs">
    <div class="row items-center no-wrap">
      <q-form>
        <q-input
          color="purple"
          dark
          standout
          v-model="search"
          label="Search"
          clearable
          style="width: 440px"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-form>
      <q-img src="/src/assets/AddBox.svg" class="addbox q-ml-md" />
    </div>
    <div class="column q-ma-xl q-pt-xl flex flex-center">
      <q-img src="/src/assets/BigBox.svg" class="bigbox self-center q-ma-sm" />
      <span class="main q-mt-md">Don't you see the box?</span>
      <span class="sub self-center q-mb-xs">Get a box and come!</span>
      <q-btn
        no-caps
        label="Add Box"
        class="button self-center q-ma-md"
        @click="addbox = true"
      />
    </div>
  </div>
  <q-dialog v-model="addbox">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h4" style="font-family: AppleSDGothicNeoB00">
          New Box
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <span style="font-family: AppleSDGothicNeoM00"
          >You can create box.</span
        >
        <q-input outlined v-model="box" label="Enter Box Name" class="newbox" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" color="black" v-close-popup />
        <q-btn
          flat
          no-caps
          label="Add"
          v-close-popup
          style="color: #7f7aee"
          @click="createBox"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.addbox {
  width: 112px;
  height: 29.25px;
}
.bigbox {
  width: 200px;
  height: 200px;
}
.main {
  font-family: AppleSDGothicNeoEB00;
  font-size: 28px;
  color: #f9f9fd;
}
.sub {
  font-family: AppleSDGothicNeoEB00;
  font-size: 16px;
  color: #f9f9fd;
}
.button {
  width: 128px;
  background-color: #7f7aee;
  font-family: AppleSDGothicNeoB00;
  color: #ebebf1;
}
.newbox {
  font-family: AppleSDGothicNeoM00;
  width: 434px;
}
</style>
