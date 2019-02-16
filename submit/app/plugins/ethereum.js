const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io')

const contract = {
}

const account = {
  address: null,
}

const activate = async provider => {
  console.log('ethereum-client:activate', provider)
  web3.setProvider(provider)
  const accounts = await web3.eth.getAccounts()
  account.address = accounts[0]
  setInterval(async () => {
    web3.eth.getAccounts().then(accounts => {
      if (account.address != accounts[0]) {
        account.address = accounts[0]
      }
    })
  }, 100)
  return account
}

const ethereum = {
  account: account,
  activate: activate,
  contract:contract
}

export default ethereum
