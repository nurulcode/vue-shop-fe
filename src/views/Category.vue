<template>
  <div>
    <v-card :to="'/category/' + category.slug" v-if="category.slug">
      <v-img
        :src="getImage('/categories/' + category.image)"
        class="white--text"
      >
        <v-card-title
          class="fill-height align-end"
          v-text="category.name"
        ></v-card-title>
      </v-img>
    </v-card>

    <v-container grid-list-sm v-if="books">
      <v-subheader>All Books</v-subheader>
    </v-container>

    <v-layout wrap>
      <v-flex v-for="book in books" v-bind:key="`category-${book.id}`" xs6>
        <v-card v-bind:to="`/book/${book.slug}`" class="ma-2">
          <v-img v-bind:src="getImage(`/books/${book.cover}`)">
            <v-card-title class="fill-height align-end" v-text="book.name">
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
    category: {},
    books: [],
    page: 0,
    lengthPage: 0
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      const { slug } = this.$route.params;
      let url = `/categories/slug/${slug}?page=${this.page}`;

      url = encodeURI(url);
      this.axios
        .get(url)
        .then(response => {
          let { data } = response.data;
          let category = data;

          this.category = category;
          this.books = category.books.data;
          this.page = category.books.current_page;
          this.lengthPage = category.books.last_page;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
