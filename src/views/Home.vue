<template>
  <div>
    <!-- categories -->
    <v-container grid-list-sm class=" align-center">
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-layout wrap>
        <v-flex
          v-for="category in categories"
          v-bind:key="`category-` + category.id"
          xs6
        >
          <v-card v-bind:to="`/category/${category.slug}`" class="ma-1">
            <v-img v-bind:src="getImage(`/categories/${category.image}`)">
              <v-card-title
                v-text="category.name"
                class="fill-height align-end"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- list books -->
    <v-container grid-list-sm class=" align-center">
      <div class="text-right">
        <v-btn small text to="/books" class="blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-layout wrap>
        <v-flex v-for="book in books" v-bind:key="`book-${book.id}`" xs6>
          <!-- <v-card v-bind:to="`/book/${book.slug}`" class="ma-1">
            <v-img
              v-bind:src="getImage(`/books/${book.cover}`)"
              class="white--text"
            >
              <v-card-title
                v-text="book.title"
                class="fill-height align-end"
              ></v-card-title>
            </v-img>
          </v-card> -->
          <book-item v-bind:book="book"></book-item>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    books: []
  }),
  components: {
    BookItem: () =>
      import(
        /* webpackChunkName: "book-item" */
        '@/components/BookItem.vue'
      )
  },
  created() {
    this.axios
      .get('/categories/random/4')
      .then(response => (this.categories = response.data.data))
      .catch(error => console.log(error.responses));

    this.axios
      .get('/books/top/4')
      .then(response => (this.books = response.data.data))
      .catch(error => console.log(error.responses));
  }
  // methods: {
  //   getImage(image) {
  //     if (image != null && image.length > 0) {
  //       // return "http://127.0.0.1:8000/storage/" + image;
  //       return process.env.VUE_APP_BACKEND_URL + "/storage/" + image;
  //     }
  //     // Default image jika tidak ditemukan,
  //     // Letakkan image ini pada folder /public/img di project Vue
  //     return "/unavailable.png";
  //   }
  // }
};
</script>
