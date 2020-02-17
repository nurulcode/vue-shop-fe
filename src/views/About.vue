<template>
  <div>
    <v-card>
      <v-toolbar drak color="info">
        <v-btn icon drak @click.native="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Login And Start Shopping!</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>

      <v-container fluid>
        <v-form ref="form" v-model="valid" lazy-validation="">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-Mail"
            required
            append-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="password"
            hint="Al last 6 characters"
            counter
          ></v-text-field>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>
