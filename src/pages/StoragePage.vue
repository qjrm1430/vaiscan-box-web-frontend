<script lang="ts">
import EmptyStorage from 'src/components/EmptyStorageComponenet.vue';
import Storage from '/src/components/StorageComponent.vue';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export default {
  name: 'StoragePage',
  components: {
    EmptyStorage,
    Storage
  },
  setup() {
    const visible = ref(-1);
    return {
      visible
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const router = useRouter();
      api
        .get('storage')
        .then((res) => {
          if (res.data.length === 0) this.visible = 1;
          else this.visible = 0;
        })
        .catch((err) => {
          console.log(err);
          router.push({ path: '/signin/username' });
        });
    }
  }
};
</script>
<template>
  <q-page padding>
    <Storage v-if="visible == 0" />
    <EmptyStorage v-else-if="visible == 1" />
  </q-page>
</template>
