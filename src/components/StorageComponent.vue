<script>
import { ref, computed, nextTick } from 'vue';
const columns = [
  // {
  //   name: 'Type',
  //   label: 'Type',
  //   field: 'type'
  // },
  {
    name: 'Title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'Date Modified',
    required: true,
    align: 'right',
    label: 'Date Modified',
    field: 'date_modified',
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
    field: 'security',
    align: 'right',
    sortable: true
  }
];

const seed = [
  {
    title: 'Frozen Yogurt',
    date_modified: 159,
    size: 6.0,
    security: 'Checking'
  },
  {
    title: 'Ice cream sandwich',
    date_modified: 237,
    size: 9.0,
    security: 'Checked'
  },
  {
    title: 'Eclair',
    date_modified: 262,
    size: 16.0,
    security: 'Checking'
  },
  {
    title: 'Cupcake',
    date_modified: 305,
    size: 3.7,
    security: 'No Check'
  },
  {
    title: 'Gingerbread',
    date_modified: 356,
    size: 16.0,
    security: 'Checked'
  },
  {
    title: 'Jelly bean',
    date_modified: 375,
    size: 0.0,
    security: 'Checking'
  },
  {
    title: 'Lollipop',
    date_modified: 392,
    size: 0.2,
    security: 'Checked'
  },
  {
    title: 'Honeycomb',
    date_modified: 408,
    size: 3.2,
    security: 'No Check'
  },
  {
    title: 'Donut',
    date_modified: 452,
    size: 25.0,
    security: 'Checking'
  },
  {
    title: 'KitKat',
    date_modified: 518,
    size: 26.0,
    security: 'Checked'
  }
];

// we generate lots of rows here
let allRows = [];
for (let i = 0; i < 1000; i++) {
  allRows = allRows.concat(seed.slice(0).map((r) => ({ ...r })));
}
allRows.forEach((row, index) => {
  row.index = index;
});

const pageSize = 50;
const lastPage = Math.ceil(allRows.length / pageSize);
export default {
  data() {
    return {
      node: 'My Box/My Directory'
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
      selected,
      columns,
      rows,

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
      search: ref(''),
      box: ref('')
    };
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
      <q-btn label="Upload" class="button q-mr-md">
        <q-menu anchor="bottom middle" self="top middle">
          <q-item clickable>
            <q-item-section>Upload Files</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Upload Folder</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn label="New Folder" class="button" />
    </div>
  </div>
  <div>
    <q-table
      dark
      class="my-sticky-dynamic"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="name"
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
