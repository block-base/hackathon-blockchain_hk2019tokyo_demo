import axios from 'axios'

const client_id = '297af3c4-a5e1-4855-9511-d1c82d59b0a7'
const client_secret = '#Tg(y`(28(+*IiX^*RKQ9kR5';
const redirect_uri = 'http://localhost:8080/openid';
const authorization_endpoint = 'https://login.microsoftonline.com/blockbasesandbox.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1a_signup_signin';
const token_endpoint = 'https://login.microsoftonline.com/blockbasesandbox.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1a_signup_signin';
const response_type = 'code';
const state =  'state_hoge';
const nonce = 'cd1a6fec5e8c2a58db7925871bdaa972'

function auth () {
    const query = 'client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirect_uri + '&scope=' + 'openid' + '&state=' + state + '&nonce=' + nonce
    window.location.href = authorization_endpoint + '&' + query
}

async function post (code) {

	const data = {
        grant_type:'authorization_code',
        client_id: client_id,
        code:code,
        client_secret:client_secret,
        redirect_uri:redirect_uri,
    }
    console.log(data)
    const response = await axios.post(token_endpoint)
    return response.data
}

const id = {
    auth:auth,
    post:post
}

export default id;
