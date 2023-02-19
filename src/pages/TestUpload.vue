<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-uploader
      multiple
      url="http://localhost:8081/storage/upload"
      :form-fields="[
        {
          name: 'path',
          value: '/'
        },
        {
          name: 'cover',
          value: 'true'
        }
      ]"
      dark
    />
  </div>
</template>
