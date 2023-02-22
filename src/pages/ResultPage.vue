<script lang="ts">
import Result from 'src/components/ShowResult.vue';
import Loading from 'src/components/ScanLoading.vue';
import Error from 'src/pages/ErrorNotFound.vue';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';

export default {
  name: 'ResultPage',
  components: {
    Result,
    Loading,
    Error
  },
  setup() {
    const route = useRoute();
    const progress = ref(0);
    const intId = ref();

    function onLoad() {
      intId.value = setInterval(() => {
        api.get('result/' + route.query.hash).then((res) => {
          if (
            (progress.value = res.data.progress) >= 100 ||
            progress.value === -1
          ) {
            clearInterval(intId.value);
          }
        });
      }, 1000);
    }
    onMounted(() => {
      onLoad();
    });

    return {
      progress,
      onLoad,
      intId
    };
  }
};
</script>
<template>
  <q-page padding>
    <Result v-if="progress >= 100" />
    <Error v-else-if="progress === -1" />
    <Loading v-else />
  </q-page>
</template>
