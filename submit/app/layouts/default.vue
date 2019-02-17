<template>
  <v-app>
    <v-toolbar app>
    <img src="~/assets/img/dhgs_logo.png" height="70%">
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon to="/admin"><v-icon color="orange darken-2" >assignment_ind</v-icon></v-btn>
      <v-btn icon to="/key"><v-icon color="orange darken-2" >vpn_key</v-icon></v-btn>
      <v-btn icon to="/verify"><v-icon color="orange darken-2" >verified_user</v-icon></v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer height="auto" color="primary lighten-1">
      <v-layout justify-center row wrap>
        <v-flex primary lighten-2 py-2 text-xs-center white--text xs12>
          &copy;2019 — <strong>DHSG & BlockBase</strong>
        </v-flex>
      </v-layout>
    </v-footer>
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
