<template>
  <v-layout>
    <div v-if="loaded">
      <img src="~/assets/img/verified_web.png" width="100%" v-if="verified && !breakpoint.xs">
      <img src="~/assets/img/unverified_web.png" width="100%" v-if="!verified && !breakpoint.xs">
      <img src="~/assets/img/verified_sp.png" width="100%" v-if="verified && breakpoint.xs">
      <img src="~/assets/img/unverified_sp.png" width="100%" v-if="!verified && breakpoint.xs">
    </div>
  </v-layout>
</template>

<script>
import ethereum from '~/plugins/ethereum-client'

export default {
    data() {
        return {
            loaded: false,
            verified: false,
            breakpoint:this.$vuetify.breakpoint
        }
    },
    mounted: async function() {
        const url_string = window.location.href
        const url = new URL(url_string);
        if(url.hash != '#/verify'){
          const params = url.hash.split('?')[1].split('&')
          const input = {
            user:'',
            data:'',
            type:''
          }

          for (const param of params){
            input[param.split('=')[0]] = param.split('=')[1]
          }

          const val = await ethereum.contract.claimVerifier.methods.verify(input.user, input.data, input.type).call()

          if(val){
              this.verified = true
          } else {
              this.verified = false
          }
          this.loaded = true
        } else {
          this.loaded = true
          alert('Please use QR code or proper url for the verification...')
        }
    },
}
</script>
