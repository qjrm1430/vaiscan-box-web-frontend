<template>
  <q-layout view="lHr lpr lFr" style="background-color: #121214">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="260"
      side="left"
      class="my-custom-alignment column"
      style="background-color: #202027"
      flex
      flex-center
    >
      <!-- drawer content -->
      <q-img
        src="src/assets/Logo.svg"
        class="q-my-md self-center"
        style="max-width: 60%"
      />

      <q-separator dark />
      <q-img
        src="src/assets/Login.svg"
        class="q-my-md self-center"
        style="max-width: 30%"
      />

      <q-separator dark />

      <div class="row q-pa-md self-center">
        <q-img src="src/assets/Box.svg" style="width: 64px; height: 26px" />
        <q-separator dark vertical class="q-mx-lg" />
        <q-img
          src="src/assets/CheckScan.svg"
          style="width: 64px; height: 22px; margin-top: 4px"
        />
      </div>

      <q-separator dark />
      <div class="q-pa-md q-gutter-md">
        <q-input
          dark
          ref="filterRef"
          outlined
          v-model="filter"
          label="Search Folder"
          class="q-px-sm"
        >
          <template v-slot:append>
            <q-icon
              v-if="filter !== ''"
              name="clear"
              class="cursor-pointer"
              @click="resetFilter"
            />
          </template>
        </q-input>
        <q-scroll-area dark style="height: 430px">
          <q-tree
            dark
            :nodes="sample"
            no-connectors
            node-key="label"
            :filter="filter"
            default-expand-all
          />
        </q-scroll-area>
      </div>
    </q-drawer>
    <q-drawer
      bordered
      show-if-above
      v-model="rightDrawerOpen"
      :width="260"
      side="right"
      class="my-custom-alignment column q-pa-md"
      style="background-color: #121214; display: flex; place-content: center"
      flex
      flex-center
    >
      <!-- drawer content -->
      <q-img
        src="src/assets/SimpleBox.svg"
        class="q-mb-lg self-center"
        style="max-width: 50%"
      />
      <span class="main self-center">
        If you select the desired file or folder, detailed information is
        displayed here.
      </span>
    </q-drawer>
    <q-page-container class="items-start">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const leftDrawerOpen = ref(false);
    const filter = ref('');
    const filterRef = ref();
    return {
      rightDrawerOpen,
      leftDrawerOpen,
      filter,
      filterRef,
      box: ref(['New Box', 'New Box']),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      sample: [
        {
          label: 'New Box',
          avatar: '/src/assets/package.svg',
          children: [
            {
              label: 'Good food (with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service (disabled node with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Good service (disabled node with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Good service (disabled node with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Good service (disabled node with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings (with icon)',
              avatar: '/src/assets/folder.svg',
              children: [
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ],
      resetFilter() {
        filter.value = '';
        filterRef.value.focus();
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.my-custom-alignment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  font-family: AppleSDGothicNeoL00;
  font-size: 14px;
  color: #868689;
}
</style>
