<template>
  <v-card>
    <v-toolbar drak color="info">
      <v-btn icon drak @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Name"
          required
          append-icon="mdi-account"
          color="info"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-Mail"
          required
          append-icon="mdi-email"
          color="info"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :label="password"
          hint="At least 6 characters"
          counter
          @click:append="showPassword = !showPassword"
          color="info"
        ></v-text-field>
        <v-checkbox
          color="info"
          v-model="checkbox"
          label="Do you agree with our privacy policy?"
          :rules="[v => !!v || 'You must agree to continue']"
        ></v-checkbox>
        <div class="text-xs-center">
          <v-btn
            color="accent lighten-1"
            :disabled="!valid"
            @click="submit"
            class="mr-5"
          >
            Register <v-icon right drak>mdi-lock-plus</v-icon>
          </v-btn>

          <v-btn @click="clear">
            Reset <v-icon right drak>mdi-lock-reset</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'register',
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 255) || 'Name must be less than 255 characters'
      ],
      email: 'akautzer@example.net',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(v) ||
          'E-mail must be valid'
      ],
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password required.',
        v => (v && v.length >= 6) || 'Min 6 characters'
      ],
      checkbox: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set'
    }),
    submit() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.set('name', this.name);
        formData.set('email', this.email);
        formData.set('password', this.password);

        this.axios
          .post('/register', formData)
          .then(response => {
            let { data } = response.data;
            this.setAuth(data);
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Register success'
            });
            this.close();
          })
          .catch(error => {
            let { data } = error.response;
            console.log(data);
            this.setAlert({
              status: true,
              color: 'error',
              text: data.message
            });
          });
      }
    },
    close() {
      this.$emit('closed', false);
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
