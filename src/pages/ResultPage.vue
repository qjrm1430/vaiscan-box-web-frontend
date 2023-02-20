<script lang="ts">
import Result from 'src/components/ShowResult.vue';
import Loading from 'src/components/ScanLoading.vue';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  name: 'ScanPage',
  components: {
    Result,
    Loading
  },
  setup() {
    const visible = ref(-1);

    const test = ref(true);

    return {
      visible,
      test
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      api.get('result').then((res) => {
        if (res.data.length === 0) this.visible = 1;
        else this.visible = 0;
      });
    }
  }
};
</script>
<template>
  <q-page padding>
    <Result v-if="test" />
    <Loading v-else />
  </q-page>
</template>
