<template>
  <div class="q-pa-md">
    <q-file
      dark
      v-model="files"
      label="Pick files"
      filled
      multiple
      style="max-width: 300px"
    />
    <q-btn color="primary" @click="uploadFile">Upload</q-btn>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  setup() {
    return {
      files: ref(null)
    };
  },
  methods: {
    onFileChange(event) {
      this.files = event.target.files;
    },
    uploadFile() {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('path', '/');
      formData.append('isCover', true);
      api
        .post('/storage/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
