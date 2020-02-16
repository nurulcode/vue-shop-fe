<template>
  <div>
    <v-container grid-list-sm>
      <v-subheader>All Category</v-subheader>
    </v-container>

    <v-layout wrap>
      <v-flex
        v-for="category in categories"
        v-bind:key="`category-${category.id}`"
        xs6
      >
        <v-card v-bind:to="`/category/${category.slug}`" class="ma-2">
          <v-img v-bind:src="getImage(`/categories/${category.image}`)">
            <v-card-title class="fill-height align-end" v-text="category.name">
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
    categories: [],
    page: 0,
    lengthPage: 0
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      const url = `/categories?page=${this.page}`;
      this.axios
        .get(url)
        .then(response => {
          let res = response.data;
          this.page = res.meta.current_page;
          this.lengthPage = res.meta.last_page;
          this.categories = res.data;
        })
        .catch(error => console.log(error.responses));
    }
  }
};
//   data() {
//     return {
//       bottom: false,
//       beers: []
//     };
//   },
//   methods: {
//     bottomVisible() {
//       const scrollY = window.scrollY;
//       const visible = document.documentElement.clientHeight;
//       const pageHeight = document.documentElement.scrollHeight;
//       const bottomOfPage = visible + scrollY >= pageHeight;
//       return bottomOfPage || pageHeight < visible;
//     },
//     addBeer() {
//       this.axios
//         .get("http://127.0.0.1:8000/api/v1/categories")
//         .then(response => {
//           let api = response.data.data[0];
//           console.log(api);
//           let apiInfo = {
//             id: api.id,
//             slug: api.slug,
//             image: api.image,
//             name: api.name
//           };
//           // console.log(apiInfo);

//           this.beers.push(apiInfo);
//           if (this.bottomVisible()) {
//             this.addBeer();
//           }
//         });
//     }
//   },
//   watch: {
//     bottom(bottom) {
//       if (bottom) {
//         this.addBeer();
//       }
//     }
//   },
//   created() {
//     window.addEventListener("scroll", () => {
//       this.bottom = this.bottomVisible();
//     });
//     this.addBeer();
//   }
// };
</script>
