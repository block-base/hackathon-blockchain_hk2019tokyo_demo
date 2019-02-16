<template>
  <v-app>
    <v-toolbar app>
    <img src="~/assets/img/dhgs_logo.png" height="70%">
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon to="/admin"><v-icon color="orange darken-2" >assignment_ind</v-icon></v-btn>
      <v-btn icon to="/key"><v-icon color="orange darken-2" >vpn_key</v-icon></v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js'
    }
  }
}
</script>
