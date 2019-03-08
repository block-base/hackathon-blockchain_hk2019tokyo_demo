<template>
  <div>
      <v-card class='pa-4'>
        <v-card-title primary-title><div class='headline'>DigiD on Azure AD B2C</div></v-card-title>
        <div class="text-xs-center">
          <v-btn dark color="#1dcd00" @click='auth' :disabled=disabled>LINE AUTH</v-btn>
        </div>
        <v-card-title primary-title><div class='headline'>ID Token</div></v-card-title>
        <v-textarea
        readonly
        auto-grow
        ></v-textarea>
      </v-card>
  </div>
</template>

<script>
import config from '~/plugins/config'
import ethereum from '~/plugins/ethereum-client'
import QRCode from 'qrcode'

//id
import id from '~/plugins/id'

export default {
    data() {
        return {
          code : '',
          disabled: false
        }
    },
    async asyncData({ store, params, error, query }) {
      if(query.code){
        const result = await id.post(query.code)
      }

    },
    mounted: async function() {
        const account = await ethereum.activate(web3.currentProvider)
    },
    methods: {
        auth () {
            id.auth()
        },
    }
}
</script>
