<template>
  <q-page padding>
    <Storage v-if="visible < 100" />
    <NoFileStorage v-else-if="visible < 200" />
    <EmptyStorage v-else />
  </q-page>
</template>
<script lang="ts">
import EmptyStorage from 'src/components/EmptyStorageComponenet.vue';
import Storage from '/src/components/StorageComponent.vue';
import NoFileStorage from '/src/components/NoFileStorageComponent.vue';

export default {
  name: 'StoragePage',
  components: {
    NoFileStorage,
    EmptyStorage,
    Storage
  },
  setup() {
    return {
      visible: 100
    };
  }
};
</script>
