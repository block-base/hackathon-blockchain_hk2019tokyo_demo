<template>
  <div>
    <v-card class='pa-4'>
      <v-card-title primary-title><div class='headline'>Publish Private Certification</div></v-card-title>
      <v-form>
          <v-text-field v-model='name' label='Name' prepend-icon='account_box'></v-text-field>
          <v-text-field label='Select Content' @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
          <input type='file' style='display: none' ref='image' accept='image/*' @change='onFilePicked'>
          <span v-if="loading && !disabled">Encrypting Certification and Publishing on IPFS...</span>
          <v-btn color='orange darken-2' dark @click='upload' :disabled='diabled'>Publish Certification<v-icon right>lock</v-icon></v-btn>
      </v-form>
    </v-card>
    <v-dialog v-model="dialog" max-width="290">
      <v-card class='pa-4'>
        <v-card-title primary-title><span id='message'></span><a id='verifyUrl' href="./#/verify"></a></v-card-title>
        <canvas id='canvas'></canvas>
      </v-card>
    </v-dialog>
    <img :src='imageUrl' width='100%' class='pa-5' v-if='imageUrl'/>
  </div>
</template>

<script>
import EthCrypto from 'eth-crypto'
import ipfs from '~/plugins/ipfs-client'
import ethereum from '~/plugins/ethereum-client'
import config from '~/plugins/config'

import QRCode from 'qrcode'

export default {
    data() {
        return {
            name: 'Marimo ( ' + config.studentAddress + ' )',
            imageName: '',
            imageUrl: '',
            imageFile: '',
            ipfs: '',
            content: '',
            loading: false,
            diabled: true,
            dialog: false
        }
    },

    mounted: async function() {
        const account = await ethereum.activate(web3.currentProvider)
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
        onFilePicked (e) {
          this.loading = true
          const files = e.target.files
          if(files[0] !== undefined) {
            this.imageName = files[0].name
            if(this.imageName.lastIndexOf('.') <= 0) {
              return
            }
            const fr = new FileReader ()
            fr.readAsDataURL(files[0])
            fr.addEventListener('load', () => {
              this.imageUrl = fr.result
              this.imageFile = files[0]
                var reader = new FileReader()
                reader.addEventListener('load', async () => {
                    var data = Buffer.from(reader.result).toString('base64')
                    var encrypted = await EthCrypto.encryptWithPublicKey(config.studentPublicKey, data)
                    console.log(encrypted)
                    var hash = await ipfs.add(JSON.stringify(encrypted))
                    var url = 'https://ipfs.io/ipfs/' + hash
                    this.imageName = url
                    this.content = ethereum.web3.utils.soliditySha3(data)
                    this.ipfs = url
                    this.diabled = false
                    this.loading = false
                })
                reader.readAsArrayBuffer(this.imageFile)
            })
          } else {
            this.imageName = ''
            this.imageFile = ''
            this.imageUrl = ''
          }
        },
        upload () {
          if (ethereum.account.address != config.schoolOwnerAddress) {
            alert('Please import DHSG admin priv key: 0xa48de82caf25eb90d81cb42f3fcf788bce60d6d4d8b527c90b8306324b7bfd09')
            return
          } else {
            const hashed = this.content
            const data = ethereum.web3.utils.soliditySha3(config.userIdentityAddress, config.certification, hashed)
            const sig = ethereum.web3.eth.accounts.sign(data, config.schoolOwnerPriveteKey).signature
            const encodedCall = ethereum.contract.claimHolder.methods.addClaim(config.certification, 0, config.schoolIdentityAddress, sig, hashed, this.ipfs).encodeABI()
            ethereum.contract.schoolIdentity.methods.execute(config.call, config.claimHolderAddress, 0, encodedCall).send({ from: ethereum.account.address, gas:1000000, gasPrice:10000000000 })
            .on('transactionHash', function(confirmationNumber, receipt){
              document.getElementById('message').innerHTML = 'Publishing...'
            })
            .on('confirmation', (confirmationNumber, receipt) => {
              const url = location.origin + '/#/verify?type=' + config.certification + '&user=' + config.userIdentityAddress + '&data=' + hashed
              const canvas = document.getElementById('canvas')
              QRCode.toCanvas(canvas, url, function (error) {
                if (error) console.error(error)
                document.getElementById('message').innerHTML = ''
                document.getElementById('verifyUrl').innerHTML = 'Published!'
                document.getElementById('verifyUrl').href = url
                console.log('success!');
              })
            })
            this.dialog = true
            document.getElementById('verifyUrl').innerHTML = ''
            document.getElementById('message').innerHTML = 'Confirm Transaction'
          }
        },
    }
}
</script>
