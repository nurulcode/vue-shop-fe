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
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>5</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-app-bar app color="info" dark v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>3</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- headerEnd -->

    <!-- navigation -->
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title><strong>John Leider</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- login and register -->
        <div class="pa-2" v-if="guest">
          <v-btn block color="info" class="mb-1">Login</v-btn>
          <v-btn block color="success">Register</v-btn>
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
          <v-btn block color="red" dark>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- navigationEnd -->

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
export default {
  name: "App",
  data: () => ({
    drawer: false,
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "About", icon: "mdi-account", route: "/about" }
    ],
    guest: false
  }),
  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  }
};
</script>
