<script>
import { ref, computed, nextTick } from 'vue';
import { api } from 'src/boot/axios';

const columns = [
  {
    name: 'Type',
    label: 'Type',
    field: 'file_type'
  },
  {
    name: 'Title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'Date Uploaded',
    required: true,
    align: 'right',
    label: 'Date Uploaded',
    field: 'upload_time',
    sortable: true
  },
  {
    name: 'Size',
    label: 'Size',
    field: 'size',
    align: 'right',
    sortable: true
  },
  {
    name: 'Security',
    label: 'Security',
    field: 'status',
    align: 'right',
    sortable: true
  }
];
// {
//     title: 'Frozen Yogurt',
//     date_modified: 159,
//     size: 6.0,
//     security: 'Checking'
// }

// we generate lots of rows here
let allRows = [];
for (let i = 0; i < 1000; i++) {
  allRows = allRows.concat(seed.value.slice(0).map((r) => ({ ...r })));
}
allRows.forEach((row, index) => {
  row.index = index;
});

const pageSize = 50;
const lastPage = Math.ceil(allRows.length / pageSize);

export default {
  data() {
    return {
      link: '',
      seeds: []
    };
  },
  setup() {
    const selected = ref([]);
    const nextPage = ref(2);
    const loading = ref(false);

    const rows = computed(() =>
      allRows.slice(0, pageSize * (nextPage.value - 1))
    );
    return {
      folder: ref(''),
      uploader: ref(false),
      newdir: ref(false),
      selected,
      columns,
      rows,
      seed: ref(this.seeds),
      nextPage,
      loading,

      pagination: { rowsPerPage: 0 },
      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${
              selected.value.length > 1 ? 's' : ''
            } selected of ${rows.value.length}`;
      },
      onScroll({ to, ref }) {
        const lastIndex = rows.value.length - 1;

        if (
          loading.value !== true &&
          nextPage.value < lastPage &&
          to === lastIndex
        ) {
          loading.value = true;

          setTimeout(() => {
            nextPage.value++;
            nextTick(() => {
              ref.refresh();
              loading.value = false;
            });
          }, 500);
        }
      },
      addbox: ref(false),
      search: ref('')
    };
  },
  mounted() {
    api.get('/storage').then((res) => {
      this.seed = res.data;
      console.log(this.fileitem);
    });
  }
};
</script>

<template>
  <div class="q-pa-xs fit row items-start">
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
    <div class="q-pa-lg fit row content-center justify-between no-wrap">
      <div class="main">{{ node }}</div>
      <q-space />
      <q-btn label="Upload" class="button q-mr-md" @click="uploader = true" />
      <q-btn label="New Folder" class="button" @click="newdir = true" />
    </div>
  </div>
  <div>
    <q-table
      dark
      class="my-sticky-dynamic"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="title"
      :filter="search"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :selected-rows-label="getSelectedString"
      @virtual-scroll="onScroll"
      selection="multiple"
      v-model:selected="selected"
    />
    <!--<div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>-->
  </div>
  <q-dialog v-model="uploader">
    <q-card>
      <q-uploader
        dark
        url="http://localhost:8081/storage/upload"
        label="Choose file to upload"
        multiple
        style="max-width: 600px; width: 400px; height: 400px"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-model="newdir">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h4" style="font-family: AppleSDGothicNeoB00">
          New Folder
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <span style="font-family: AppleSDGothicNeoM00">
          You can create Folder.
        </span>
        <q-input
          outlined
          v-model="folder"
          label="Enter Folder Name"
          class="newbox"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" color="black" v-close-popup />
        <q-btn flat no-caps label="Add" v-close-popup style="color: #7f7aee" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.addbox {
  width: 112px;
  height: 29.25px;
}
.main {
  font-family: AppleSDGothicNeoEB00;
  font-size: 28px;
  color: #f9f9fd;
}
.button {
  background-color: #7f7aee;
  font-family: AppleSDGothicNeoB00;
  color: #ebebf1;
}
.newbox {
  font-family: AppleSDGothicNeoM00;
  width: 434px;
}
.my-sticky-dynamic {
  height: 550px;
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */ {
    background-color: #f9f9fd;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }

  /* this will be the loading indicator */
  thead tr:last-child th {
    /* height of all previous header rows */
    top: 40px;
  }

  thead tr:first-child th {
    top: 0;
  }
}
</style>
