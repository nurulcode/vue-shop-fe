<template>
  <v-snackbar :color="color" v-model="alert" multi-line top>
    {{ text }}
    <v-btn dark text @click="close">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'alert',
  computed: {
    ...mapGetters({
      status: 'alert/status',
      color: 'alert/color',
      text: 'alert/text'
    }),
    alert: {
      get() {
        return this.status;
      },
      set() {
        this.setAlert({
          status: false,
          type: 'success',
          text: 'test'
        });
      }
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set'
    }),
    close() {
      this.setAlert({
        status: false
      });
    }
  }
};
</script>
