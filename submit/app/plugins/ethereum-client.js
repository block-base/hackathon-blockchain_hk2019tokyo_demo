const config = require('./config').default
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io')

const contract = {
  userIdentity: new web3.eth.Contract(config.identityABI, config.userIdentityAddress),
  schoolIdentity: new web3.eth.Contract(config.identityABI, config.schoolIdentityAddress),
  claimHolder: new web3.eth.Contract(config.claimHolderABI, config.claimHolderAddress),
  claimVerifier: new web3.eth.Contract(config.claimVerifierABI, config.claimVerifierAddress),
}

const account = {
  address: null,
}

const activate = async provider => {
  web3.setProvider(provider)
  const accounts = await web3.eth.getAccounts()
  account.address = accounts[0]
  setInterval(async () => {
    web3.eth.getAccounts().then(accounts => {
      if (account.address != accounts[0]) {
        account.address = accounts[0]
        location.reload()
      }
    })
  }, 100)
  return account
}

const client = {
  account: account,
  activate: activate,
  contract:contract,
  web3:web3
}

export default client
