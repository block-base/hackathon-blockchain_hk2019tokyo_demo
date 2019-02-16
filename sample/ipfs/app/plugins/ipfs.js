const axios = require('axios');
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function IpfsManager() {

}

IpfsManager.add = function (data) {
    return new Promise(resolve => {
        ipfs.add(Buffer.from(data)
        ).then(async result => {
            resolve(result[0].hash)
        }).catch(err =>
            console.log(err)
        )
    })
}

export default IpfsManager;
