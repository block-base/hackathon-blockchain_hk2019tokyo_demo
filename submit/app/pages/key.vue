<template>
  <div>
    <v-card class='pa-4'>
      <v-card-title primary-title><div class='headline'>プライベート証明書の復元</div></v-card-title>
      <v-form>
          <v-text-field label='Select Content' v-model='imageName' prepend-icon='attach_file'></v-text-field>
          <v-text-field v-model='privateKey' label='秘密鍵' prepend-icon='vpn_key'></v-text-field>
          <v-btn color='orange darken-2' dark @click='unlock' >証明書の復元<v-icon right>lock_open</v-icon></v-btn>
      </v-form>
    </v-card>
    <img :src='imageUrl' width='100%' class='pa-5' v-if='imageUrl'/>
  </div>
</template>

<script>
import EthCrypto from 'eth-crypto'
import axios from 'axios'
import ipfs from '~/plugins/ipfs-client'
import ethereum from '~/plugins/ethereum-client'
import config from '~/plugins/config'

export default {
    data() {
        return {
            imageName: 'https://ipfs.io/ipfs/QmPiS2HppdHhpkEyMB3J2krxK5Fw8SFG26Y5dmXANdvE8C',
            privateKey: config.studentPrivateKey,
            imageUrl: ''
          }
    },

    mounted: async function() {
        const account = await ethereum.activate(web3.currentProvider)
    },
    methods: {
        async unlock () {
            var response = await axios(this.imageName)
            console.log(response.data)
            var decryptWithPrivateKey = await EthCrypto.decryptWithPrivateKey(this.privateKey, response.data)
            this.imageUrl = 'data:image/png;base64,' + decryptWithPrivateKey
            console.log(this.imageUrl)
        },
    }
}
</script>
