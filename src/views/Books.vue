<template>
  <div>
    <v-container grid-list-sm>
      <v-subheader>All Category</v-subheader>
    </v-container>
    <!-- warp ukebawah -->
    <v-layout wrap>
      <v-flex v-for="book in books" v-bind:key="`book-${book.id}`" xs6>
        <v-card v-bind:to="`/book/${book.slug}`" class="ma-2">
          <v-img v-bind:src="getImage(`/books/${book.cover}`)">
            <v-card-title class="fill-height align-end" v-text="book.title">
            </v-card-title>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>

    <v-pagination
      color="info"
      v-bind:length="lengthPage"
      v-model="page"
      v-on:input="go"
      v-bind:total-visible="5"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    books: [],
    page: 0,
    lengthPage: 0
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      const url = `/books?page=${this.page}`;
      console.log(url);
      this.axios
        .get(url)
        .then(response => {
          let res = response.data;
          console.log(res);
          this.page = res.meta.current_page;
          this.lengthPage = res.meta.last_page;
          this.books = res.data;
        })
        .catch(error => console.log(error.responses));
    }
  }
};
</script>
