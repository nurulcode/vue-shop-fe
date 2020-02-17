<template>
  <v-card>
    <v-toolbar color="info" drak>
      <v-btn icon drak @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-text-field
        hide-details
        append-icon="mdi-microphone"
        flat
        autofocus="true"
        label="Search"
        prepend-icon="mdi-magnify"
        v-model="keyword"
        @input="doSearch"
      >
      </v-text-field>
    </v-toolbar>
    <v-card-text>
      <v-subheader v-if="keyword.length > 0">
        Result search "{{ keyword }}"
      </v-subheader>
      <v-alert type="warning" :value="books.length == 0 && keyword.length > 0">
        Sorry, but no result were found
      </v-alert>
      <!-- Hasil pencarian -->
      <v-container grid-list-sm class="ma-0 p-0">
        <v-layout wrap>
          <v-flex v-for="book in books" :key="`book-${book.id}`">
            <book-item :book="book" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'search',
  components: {
    BookItem: () =>
      import(/* webpackChunkName: "book-item" */ '@/components/BookItem.vue')
  },
  data() {
    return {
      keyword: '',
      books: []
    };
  },
  methods: {
    doSearch() {
      let keyword = this.keyword;
      if (keyword.length > 0) {
        this.axios
          .get('/books/search/' + keyword)
          .then(response => {
            let { data } = response.data;

            this.books = data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.books = [];
      }
    },
    close() {
      this.$emit('closed', false);
    }
  }
};
</script>
