new Vue({
  el: "#app",
  data() {
    return {
      bottom: false,
      beers: []
    };
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addBeer() {
      axios.get("https://api.punkapi.com/v2/beers/random").then(response => {
        let api = response.data[0];
        let apiInfo = {
          name: api.name,
          img: api.image_url,
          tagline: api.tagline
        };
        this.beers.push(apiInfo);
        if (this.bottomVisible()) {
          this.addBeer();
        }
      });
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addBeer();
      }
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.addBeer();
  }
});
