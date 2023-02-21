<script lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
interface TreeData {
  label: string;
  avatar: string;
  children: TreeData[];
}

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const leftDrawerOpen = ref(false);
    const filter = ref('');
    const filterRef = ref();
    const $q = useQuasar();
    const username = $q.cookies.get('name');
    const treeData = ref<TreeData[]>([]);

    function getTreeData() {
      api.get('/storage/dir').then((res) => {
        res.data.sort(function (a: any, b: any) {
          return a.path - b.path;
        });
        for (let dir of res.data) {
          if (dir.path === '/') {
            treeData.value.push({
              label: dir.original_name,
              avatar: '/src/assets/package.svg',
              children: []
            });
          } else {
            const arrayPath = dir.path.split('/');
            let tempArray = treeData.value;
            for (let pathIndex = 1; arrayPath.length > pathIndex; pathIndex++) {
              let index = tempArray.findIndex((data) => {
                return data.label === arrayPath[pathIndex];
              });
              tempArray = tempArray[index].children;
            }
            tempArray.push({
              label: dir.original_name,
              avatar: '/src/assets/folder.svg',
              children: []
            });
          }
        }
      });
    }

    onMounted(() => {
      getTreeData();
    });

    return {
      rightDrawerOpen,
      leftDrawerOpen,
      filter,
      filterRef,
      username,
      treeData,
      getTreeData,
      box: ref(['New Box', 'New Box']),

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      resetFilter() {
        filter.value = '';
        filterRef.value.focus();
      }
    };
  },
  updated() {
    console.log('update');
  },
  methods: {
    logout() {
      api.post('/auth/signout').then(() => {
        const $q = useQuasar();
        console.log('logout');
        $q.cookies.remove('accessToken');
      });
    }
  }
};
</script>

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
      <q-btn flat class="q-my-md">
        <span class="login"> {{ username }} </span>
        <q-menu anchor="bottom middle" self="top middle">
          <q-item clickable @click="logout()" to="/">
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>

      <q-separator dark />

      <div class="row q-pa-sm q-py-md self-center">
        <q-btn disable flat to="/storage">
          <q-img
            src="src/assets/CheckBox.svg"
            style="width: 64px; height: 26px"
          />
        </q-btn>
        <q-separator dark vertical class="q-mx-lg" />

        <q-btn flat to="/">
          <q-img
            src="src/assets/Scan.svg"
            style="width: 64px; height: 22px; margin-top: 4px"
          />
        </q-btn>
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
        <q-scroll-area dark style="height: 400px">
          <q-tree
            dark
            :nodes="treeData"
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
.login {
  font-family: AppleSDGothicNeoB00;
  font-size: 20px;
  color: #ebebf1;
}
</style>
