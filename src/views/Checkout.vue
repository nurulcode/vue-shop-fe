<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="name"
              v-model="name"
              required
              append-icon="mdi-account"
            ></v-text-field>

            <v-textarea
              label="address"
              v-model="address"
              required
              auto-grow
              rows="3"
            ></v-textarea>

            <v-text-field
              label="phone"
              v-model="phone"
              required
              append-icon="mdi-phone"
            ></v-text-field>

            <v-select
              :items="province_id"
              v-model="provin"
              label="label"
            ></v-select>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </div>
</template>
