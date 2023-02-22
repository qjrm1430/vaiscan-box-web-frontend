<script lang="ts">
import EmptyStorage from 'src/components/EmptyStorageComponenet.vue';
import Storage from '/src/components/StorageComponent.vue';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'StoragePage',
  components: {
    EmptyStorage,
    Storage
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const visible = ref(-1);

    function onLoad() {
      const box = route.params.box;
      api
        .get('storage')
        .then((res) => {
          if (res.data.length === 0) visible.value = 1;
          else visible.value = 0;
        })
        .catch((err) => {
          console.log(err);
          router.push({ path: '/signin/username' });
        });
    }

    onMounted(() => {
      onLoad();
    });

    return {
      visible,
      onLoad
    };
  }
};
</script>
<template>
  <q-page padding>
    <Storage v-if="visible == 0" />
    <EmptyStorage v-else-if="visible == 1" />
  </q-page>
</template>
