<template>
  <div>
    <v-card>
      <v-toolbar color="info" drak>
        <v-btn icon drak @click.native="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-text-field
          hidden-details
          append-icon="mdi-microphone"
          flat
          autofocus="true"
          label="Search"
          prepend-icon="mdi-magnify"
          v-model="keyword"
          @input="doSearch"
        >
        </v-text-field>
      </v-toolbar>
    </v-card>
  </div>
</template>
