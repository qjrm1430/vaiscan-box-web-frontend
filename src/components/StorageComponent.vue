<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';

function formatSize(val) {
  if (val === null) {
    return '';
  } else if (val < 1024) {
    return val + ' B';
  } else if (val < 1024 * 1024) {
    return (val / 1024).toFixed(2) + ' KB';
  } else {
    return (val / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'original_name',
    sortable: true,
    format: (val) => {
      const extensionIndex = val.lastIndexOf('.');
      if (extensionIndex > -1) {
        return val.slice(0, extensionIndex);
      }
      return val;
    }
  },
  {
    name: 'Size',
    label: 'Size',
    field: 'size',
    align: 'right',
    sortable: true,
    format: (val) => formatSize(val)
  },
  {
    name: 'Type',
    label: 'Type',
    field: 'file_type',
    align: 'right',
    sortable: true,
    format: (val, row) => {
      if (row.original_name == row.original_name.split('.').pop()) {
        return 'FOLDER';
      } else {
        const extension = row.original_name.split('.').pop();
        return extension.toUpperCase();
      }
    }
  },
  {
    name: 'Date Modified',
    required: true,
    align: 'right',
    label: 'Date Modified',
    field: 'upload_time',
    sortable: true,
    format: (val) =>
      new Date(val).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
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
    const node = ref();
    const folder = ref('');
    const box = ref('');
    function getFileList() {
      api.get('storage', { params: { path: btoa(node.value) } }).then((res) => {
        rows.value = res.data;
      });
    }
    return {
      uploader: ref(false),
      newdir: ref(false),
      addbox: ref(false),
      del: ref(false),
      box,
      selected,
      columns,
      rows,
      node,
      folder,
      getFileList,
      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${
              selected.value.length > 1 ? 's' : ''
            } selected of ${rows.value.length}`;
      },
      delete() {
        return selected.value.length === 0;
      },
      onClick(evt, row) {
        if (row.file_type === 'dir') {
          let path = '';
          if (row.path === '/') {
            path = '/' + row.original_name;
          } else {
            path = row.path + '/' + row.original_name;
          }
          node.value = path;
          getFileList();
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
      search: ref('')
    };
  },
  created() {
    this.pageLoad();
  },
  methods: {
    createBox() {
      api.post('storage/create', { name: this.box, path: '/' }).then(() => {
        this.getFileList();
        this.box = '';
      });
    },
    pageLoad() {
      api.get('storage').then((res) => {
        const path = res.data[0].path + res.data[0].original_name;
        this.node = path;
        this.getFileList();
      });
    },
    handleFileUploadc() {
      // Create a hidden file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      input.multiple = 'ture';

      // Add an event listener to retrieve the selected file(s)
      input.addEventListener('change', (event) => {
        const files = event.target.files; // Get the first file selected by the user

        // Create a new FormData object and add the file to it
        const formData = new FormData();
        for (let file of files) {
          formData.append('files', file);
        }
        formData.append('path', this.node);
        formData.append('isCover', true);
        // Use Axios to upload the file to the server
        api
          .post('/storage/upload', formData)
          .then((res) => {
            this.getFileList();
            // Do something with the server response, if needed
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      });

      // Click the hidden file input to trigger the file input dialog
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
    handleFileUpload() {
      // Create a hidden file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      input.multiple = 'ture';

      // Add an event listener to retrieve the selected file(s)
      input.addEventListener('change', (event) => {
        const files = event.target.files; // Get the first file selected by the user

        // Create a new FormData object and add the file to it
        const formData = new FormData();
        for (let file of files) {
          formData.append('files', file);
        }
        formData.append('isCover', false);
        formData.append('path', this.node);
        // Use Axios to upload the file to the server
        api
          .post('/storage/upload', formData)
          .then((res) => {
            this.getFileList();
            // Do something with the server response, if needed
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      });

      // Click the hidden file input to trigger the file input dialog
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
    createFolder() {
      api
        .post('storage/create', { name: this.folder, path: this.node })
        .then(() => {
          this.getFileList();
          this.folder = '';
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
      <q-btn flat class="self-center q-ml-md" @click="addbox = true">
        <q-img src="/src/assets/AddBox.svg" class="addbox" />
      </q-btn>
    </div>
    <div class="q-pa-lg fit row content-center justify-between no-wrap">
      <div class="main">{{ node }}</div>
      <q-space />
      <q-btn
        label="Delete"
        class="button q-mr-md self-center"
        @click="del = true"
        v-if="!this.delete()"
      />
      <q-btn label="Upload" class="button q-mr-md self-center">
        <q-menu anchor="bottom middle" self="top middle">
          <q-item clickable @click="handleFileUpload()">
            <q-item-section>Upload - skip</q-item-section>
          </q-item>
          <q-item clickable @click="handleFileUploadc()">
            <q-item-section>Upload - overwrite</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn
        label="New Folder"
        class="button self-center"
        @click="newdir = true"
      />
    </div>
  </div>
  <div>
    <q-table
      dark
      class="my-sticky-dynamic"
      :rows="rows"
      :columns="columns"
      row-key="original_name"
      :filter="search"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :rows-per-page-options="[0]"
      @row-click="onClick"
    />
    <!--<div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>-->
  </div>
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
        <q-btn
          flat
          no-caps
          label="Add"
          v-close-popup
          style="color: #7f7aee"
          @click="createFolder()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
  <q-dialog v-model="del">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h4" style="font-family: AppleSDGothicNeoB00">
          Delete
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <span style="font-family: AppleSDGothicNeoM00"
          >Do you want to delete?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" color="black" v-close-popup />
        <q-btn
          flat
          no-caps
          label="Add"
          v-close-popup
          style="color: #7f7aee"
          @click="remove()"
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
