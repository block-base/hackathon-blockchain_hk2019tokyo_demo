<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
      </div>
      <form>
        <div class="form-content">
          <span>Data</span>
          <el-input placeholder="" v-model="formData.id" />
        </div>
        <div class="form-content">
          <span>Alice Random AES Key</span>
          <el-input placeholder="" v-model="aliceAesKey" />
        </div>
        <div>
          <span>Encrypt Data</span>
          <el-input placeholder="" v-model="ciphertext" />
        </div>
        <div>
          <span>Ipfs Hash</span>
          <el-input placeholder="" v-model="ipfsHash" />
        </div>
        <div class="form-content">
          <span>Bob Public Key</span>
          <el-input placeholder="" v-model="bobPrivKey" />
        </div>
         <div class="form-content">
          <span>Bob Private Key</span>
          <el-input placeholder="" v-model="bobPubKey" />
        </div>
        <div>
          <span>Decrypt Data</span>
          <el-input placeholder=""  v-model="encryptoData"/>
        </div>
        <br>

        <div class="text-right">
          <el-button type="primary" @click="encryptData">Encrypt</el-button>
          <el-button type="primary" @click="decryptData">Decrypt</el-button>
        </div>
        <br>
      </form>
    </el-card>
  </section>
</template>

<script>
import EthCrypto from 'eth-crypto'
import CryptoJS from 'crypto-js'
import IpfsManager from '~/plugins/ipfs'
import axios from 'axios'

export default {
  data(){
    return{
    }
  },
  asyncData() {
    const identity_Bob = EthCrypto.createIdentity();
    console.log(identity_Bob)

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	  var randomstring = '';
	  for (var i = 0; i < 50; i++) {
		  var rnum = Math.floor(Math.random() * chars.length);
		  randomstring += chars.substring(rnum, rnum + 1);
    }

    return {
      aliceAesKey:randomstring,
      isCreateMode: false,
      formData: {
        id: ''
      },
      bobPubKey:identity_Bob.publicKey,
      bobPrivKey:identity_Bob.privateKey,
      ciphertext:"",
      encryptoData:"",
      ipfsHash:"",
      ipfsData:""
    }
  },
  methods: {
    async encryptData() {
      var ciphertext = CryptoJS.AES.encrypt(this.formData.id, this.aliceAesKey);
      this.ciphertext = ciphertext.toString()

      var hash = await IpfsManager.add(this.ciphertext);
      var url = "https://ipfs.io/ipfs/" + hash
      console.log("https://ipfs.io/ipfs/" + hash)
      this.ipfsHash = url

    },

    async decryptData() {
      var text = await axios(this.ipfsHash)
      this.ipfsData = text.data
      console.log(text)
      // asymmetrically Encrypt AES key with public key of Bob
      console.log("====1====")
      EthCrypto.encryptWithPublicKey(
	      this.bobPubKey,
	      this.aliceAesKey
      ).then((encrypted) => {
	      console.log("====2====")
	      console.log("encrypted")
	      console.log(encrypted)
	      EthCrypto.decryptWithPrivateKey(
			      this.bobPrivKey,
			      encrypted)
		      .then((decryptedAESKey) => {
			      console.log("====3====")
			      console.log("decryptedAESKey")
			      console.log(decryptedAESKey)

            console.log(this.ciphertext)
            console.log(this.ipfsData)
			      var bytes = CryptoJS.AES.decrypt(this.ipfsData, decryptedAESKey);
			      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
			      console.log("====4====")
            console.log('message after  =', plaintext.substring(0, 50), '...');
            this.encryptoData = plaintext
            console.log(plaintext)

		      })
      })

    },

  }
}
</script>

<style scoped>
.form-content {
  margin: 16px 0;
}
</style>
