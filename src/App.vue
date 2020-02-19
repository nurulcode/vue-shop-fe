<template>
  <v-app>
    <!-- header -->
    <v-app-bar app color="info" dark v-if="isHome" extended>
      <v-app-bar-nav-icon v-on:click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title to="/">{{ appName }}</v-toolbar-title>
      <v-text-field
        slot="extension"
        hide-details
        appendIcon="mdi-microphone"
        flat
        label="Search"
        prependInnerIcon="mdi-magnify"
        soloInverted
        @click="setDialogComponent('search')"
      >
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon to="/about">
        <v-badge color="orange" overlap v-if="countCart > 0">
          <template v-slot:badge>
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar app color="info" dark v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge color="orange" overlap v-if="countCart > 0">
          <template v-slot:badge>
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- headerEnd -->

    <!-- navigation -->
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img :src="getImage(`/users/${user.avatar}`)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              ><strong>{{ user.name }}</strong></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <!-- login and register -->
        <div class="pa-2" v-if="guest">
          <v-btn
            block
            color="info"
            class="mb-1"
            @click="setDialogComponent('login')"
            >Login</v-btn
          >
          <v-btn
            block
            color="success"
            class="mb-1"
            @click="setDialogComponent('register')"
            >Register</v-btn
          >
        </div>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in menus"
          v-bind:key="`menu-` + index"
          v-bind:to="item.route"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- logout -->
      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- navigationEnd -->
    <!-- alert -->
    <Alert />
    <!-- alertEnd -->

    <!-- search -->
    <!-- <v-dialog
      v-model="dialog"
      scrollable
      fullscreen
      hide-overlay
      transition="dialog-transition"
    >
      <search @closed="closeDialog"></search>
    </v-dialog> -->

    <keep-alive>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-transition"
      >
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>
    <!-- searchEnd -->

    <!-- content -->
    <v-content>
      <v-container fluid>
        <v-expand-transition>
          <router-view></router-view>
        </v-expand-transition>
      </v-container>
    </v-content>
    <!-- contentEnd -->

    <!-- footer -->
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} — <strong>Vueshop</strong>
        </v-card-text>
      </v-footer>
    </v-card>
    <!-- footerEnd -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Alert: () => import('./components/Alert'),
    Search: () => import('./components/Search'),
    Login: () => import('./components/Login'),
    Register: () => import('./components/Register')
  },
  data: () => ({
    // toggle menus
    drawer: false,
    menus: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'About', icon: 'mdi-account', route: '/about' }
    ]
  }),
  methods: {
    ...mapActions({
      setDialogStatus: 'dialog/setStatus',
      setDialogComponent: 'dialog/setComponent',
      setAuth: 'auth/set',
      setAlert: 'alert/set'
    }),
    logout() {
      let config = {
        header: {
          Authorization: `'Bearer ${this.user.api_token}`
        }
      };
      this.axios
        .post('/logout', {}, config)
        .then(() => {
          this.setAuth({});
          this.setAlert({
            status: true,
            color: 'success',
            text: 'logout successfullly'
          });
          this.drawer = false;
        })
        .catch(error => {
          let { data } = error.response;
          this.setAlert({
            status: true,
            color: 'error',
            text: data.message
          });
        });
    }
  },
  computed: {
    isHome() {
      return this.$route.path === '/';
    },
    ...mapGetters({
      countCart: 'cart/count',
      guest: 'auth/guest',
      user: 'auth/user',
      dialogStatus: 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      }
    }
  }
};
</script>
