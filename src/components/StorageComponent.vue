<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';

const columns = [
  // {
  //   name: 'Type',
  //   label: 'Type',
  //   field: 'type'
  // },
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'original_name',
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
    name: 'Type',
    label: 'Type',
    field: 'file_type',
    align: 'right',
    sortable: true
  },
  {
    name: 'Date Modified',
    required: true,
    align: 'right',
    label: 'Date Modified',
    field: 'upload_time',
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

export default {
  setup() {
    const selected = ref([]);
    const rows = ref([]);
    const node = ref('/');
    return {
      uploader: ref(false),
      selected,
      columns,
      rows,
      node,
      pagination: { rowsPerPage: 0 },
      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${
              selected.value.length > 1 ? 's' : ''
            } selected of ${rows.value.length}`;
      },
      onClick(evt, row) {
        if (row.file_type === 'dir') {
          let path = '';
          if (row.path === '/') {
            path = '/' + row.original_name;
          } else {
            path = row.path + '/' + row.original_name;
          }
          const encodedPath = btoa(path);
          api.get('storage', { params: { path: encodedPath } }).then((res) => {
            node.value = path;
            rows.value = res.data;
          });
        } else {
          api
            .post(
              'storage/download',
              { storage_id: row.storage_id },
              { responseType: 'blob' }
            )
            .then((res) => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', row.original_name);
              document.body.appendChild(link);
              link.click();
            });
        }
      },
      addbox: ref(false),
      search: ref(''),
      box: ref('')
    };
  },
  created() {
    this.pageLoad();
  },
  methods: {
    pageLoad() {
      api.get('storage').then((res) => {
        const path = res.data[0].path + res.data[0].original_name;
        const encodedPath = btoa(path);
        api.get('storage', { params: { path: encodedPath } }).then((res) => {
          this.node = path;
          this.rows = res.data;
        });
      });
    }
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

      <q-btn label="New Folder" class="button" />
    </div>
  </div>
  <div>
    <q-table
      dark
      class="my-sticky-dynamic"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :rows-per-page-options="[0]"
      @row-click="onClick"
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
