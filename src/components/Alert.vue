<template>
  <v-snackbar :color="color" v-model="alert" :timeout="timeout" multi-line top>
    {{ text }}
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
      text: 'alert/text',
      timeout: 'alert/timeout'
    }),
    alert: {
      get() {
        return this.status;
      },
      set() {
        this.setAlert({
          status: false,
          type: 'success',
          text: 'test',
          timeout: 2000
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
