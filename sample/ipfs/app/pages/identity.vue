<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
      </div>
      <form>
        <!-- <h1>User</h1>
        <div class="form-content">
          <span>Alice Random AES Key</span>
          <el-input placeholder="" v-model="aliceAesKey" />
        </div> -->
        <h1>University</h1>
        <label for="publish" class="file" >
              <input type="file" id="publish" />
          </label>
        <div class="form-content">
          <span>Data</span>
          <el-input placeholder="" v-model="formData.id" />
        </div>

        <!-- <el-upload
          class="upload-demo" id="publish">
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload> -->
        <div>
          <span>Encrypt Data</span>
          <el-input placeholder="" v-model="ciphertext" />
        </div>
        <div>
          <span>Ipfs Hash</span>
          <el-input placeholder="" v-model="ipfsHash" />
        </div>

        <h1>Company</h1>
        <div class="form-content">
          <span>Public Key</span>
          <el-input placeholder="" v-model="bobPrivKey" />
        </div>
         <div class="form-content">
          <span>Private Key</span>
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
           <el-button type="primary" @click="encryptData2">Encrypt2</el-button>
          <el-button type="primary" @click="test">account</el-button>
           <el-button type="primary" @click="input">input</el-button>
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
import Ethers from 'ethers'
import axios from 'axios'
import web3 from 'web3'

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
      ipfsData:"",
      imgData:""
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
    async test(){
      console.log(1)
      // var wallet = Ethers.Wallet.createRandom();
      // console.log(wallet)
      var wallet = web3.eth.accounts.create()
      console.log(wallet)

    },

    async encryptData2() {
      // asymmetrically Encrypt AES key with public key of Bob
      console.log(this.imgData)
      var encrypted = await EthCrypto.encryptWithPublicKey(this.bobPubKey,data)
      console.log(encrypted)
      var decryptWithPrivateKey = await EthCrypto.decryptWithPrivateKey(this.bobPrivKey,encrypted)
      console.log(decryptWithPrivateKey)
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

    async input() {
      console.log(1)
      var encrypted = await EthCrypto.encryptWithPublicKey(this.bobPubKey,"ko")
      console.log(2)
      console.log(encrypted)
      var decryptWithPrivateKey = await EthCrypto.decryptWithPrivateKey(this.bobPrivKey,encrypted)
      console.log(decryptWithPrivateKey)
      var data = this.data
      // return new Promise(resolve => {
      var imgData = document.getElementById("publish");
      var reader = new FileReader();
      reader.readAsArrayBuffer(imgData.files[0]);
      reader.onloadend = async function (event) {
        console.log(reader.result)
        data = Buffer.from(reader.result)
        console.log(data)
        console.log(EthCrypto)
      }
    // })
    }
  }
}
</script>

<style scoped>
.form-content {
  margin: 16px 0;
}
</style>
