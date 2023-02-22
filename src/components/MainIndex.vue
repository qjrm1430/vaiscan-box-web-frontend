<script>
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return {
      uploader: ref(false),
      routing(hash) {
        router.push({ path: '/result', query: { hash: hash } });
      }
    };
  },
  methods: {
    handleFileUpload() {
      // Create a hidden file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      // Add an event listener to retrieve the selected file(s)
      input.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Get the first file selected by the user

        // Create a new FormData object and add the file to it
        const formData = new FormData();
        formData.append('file', file);
        // Use Axios to upload the file to the server
        api
          .post('/upload', formData)
          .then((res) => {
            console.log(res);
            this.routing(res.data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      });

      // Click the hidden file input to trigger the file input dialog
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    }
  }
};
</script>
<template>
  <div class="flex flex-center column">
    <div class="q-my-xl">
      <q-img
        src="src\assets\MainLogo.svg"
        style="min-width: 345px; height: 96px"
      />
    </div>
    <div class="q-my-xl">
      <span class="main">
        Analyse suspicious files to detect malware and other breaches.
      </span>
    </div>
    <div>
      <q-img
        src="src\assets\SearchFile.svg"
        style="width: 128px; height: 128px"
      />
    </div>
    <div class="q-ma-md">
      <q-btn
        no-caps
        icon="search"
        label="Choose file to scan"
        class="button"
        @click="handleFileUpload()"
      />
    </div>
    <div style="max-width: 710px" class="q-my-xl">
      <span class="main">
        By submitting data above, you are agreeing to our Terms of Service and
        Privacy Policy, and to the sharing of your Sample submission with the
        security community. Please do not submit any personal information; Black
        Whopper is not responsible for the contents of your submission.
        <!-- here is the dark spot -->
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 416px;
  height: 19px;
  font-family: AppleSDGothicNeoM00;
  font-size: 16px;
  color: #585d6e;
}
.button {
  border-radius: 5px;
  font-family: AppleSDGothicNeoB00;
  font-size: 14px;
  color: #ebebf1;
  background-color: #7f7aee;
}
</style>
