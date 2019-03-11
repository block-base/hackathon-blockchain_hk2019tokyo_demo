<template>
  <div>
      <v-card class='pa-4'>
        <v-card-title primary-title><div class='headline'>DigiD on Azure AD B2C</div></v-card-title>
        <div class="text-xs-center" v-if="!id">
          <v-btn dark color="#1dcd00" @click='auth'>LINE AUTH</v-btn>
        </div>
        <div class="text-xs-center" v-else>
          <v-btn dark color="blue" @click='publish'>Publish</v-btn>
        </div>
        <v-card-text v-if="id">{{id}}</v-card-text>
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
    async asyncData({ query }) {
      if(query.code){
        var result = await id.post(query.code)
        return {id:result.decoded, jwt:result.id_token}
      }
    },
    mounted: async function() {
        const account = await ethereum.activate(web3.currentProvider)
    },
    methods: {
        auth () {
            id.auth()
        },
        publish () {
          const hashed =  ethereum.web3.utils.soliditySha3(this.jwt)
          const data = ethereum.web3.utils.soliditySha3(config.userIdentityAddress, config.certification, hashed)
          const sig = ethereum.web3.eth.accounts.sign(data, config.schoolOwnerPriveteKey).signature
          const encodedCall = ethereum.contract.claimHolder.methods.addClaim(config.certification, 0, config.schoolIdentityAddress, sig, hashed, '').encodeABI()
          ethereum.contract.schoolIdentity.methods.execute(config.call, config.claimHolderAddress, 0, encodedCall).send({ from: ethereum.account.address, gas:1000000, gasPrice:10000000000 })
          .on('transactionHash', function(confirmationNumber, receipt){
            document.getElementById('message').innerHTML = 'Publishing...'
          })
        }
    }
}
</script>
