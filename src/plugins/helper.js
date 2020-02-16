"use strict";

import Vue from "vue";
const Helper = {
  install(vue) {
    vue.prototype.appName = process.env.VUE_APP_NAME;
    vue.prototype.getImage = image => {
      if (image != null && image.length > 0) {
        // return "http://127.0.0.1:8000/storage/" + image;
        return process.env.VUE_APP_BACKEND_URL + "/storage" + image;
      }
      // Default image jika tidak ditemukan,
      // Letakkan image ini pada folder /public/img di project Vue
      return "/unavailable.png";
    };
  }
};

Vue.use(Helper);
