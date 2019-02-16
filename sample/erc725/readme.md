# ERC725

## Concept
This is sample for ERC725.

## 検討事項
 - ERC725のIdentityとKeyManagementシステムとの連携
 - 秘密鍵を無くした場合のリカバリー方法

## Implementation Note
### ERC725のIdentityとERC734のKeyManagementとの連携
 - IdentityはERC725に準拠しプロキシとして動作する。
 - ClaimHolderはERC735に準拠し各種認証情報を保管する。
 - IdentityとClaimHolderをデプロイする。
 - IdentityのKeyにClaimHolderを設定する。
 - ClaimHolderの管理アカウントにIdentityを設定する。

### 秘密鍵を無くした場合のリカバリー方法
 - ERC725コントラクトを複数人で運用できる形態にする。
 - 今回のハッカソンでは暫定的に2/3以上の承認があった場合にManagementKeyを変更することを可能にする。

## Actual Implementation
 - ユーザーがIdentityをデプロイできる。
 - ユーザーがIdentityをオーナーとしたKeyManagementを登録できる。
 - ユーザーがKeyManagementに認証情報を登録できる。

### Drafting
![alt text](https://github.com/block-base/blockchain_hk2019tokyo_demo/blob/master/sample/erc725/img/draft.png)

### Identity
 - 0xaad0bb0dFfaEF8C2b0C07Dc9Ba9603083E8bE1f5 (user student -> claim holder)
https://rinkeby.etherscan.io/address/0xb6b23f917d1ff382754cd891f84788248d39a496#code

 - 0x61a12c10676e7ef993d21e3b1da9a137406b9689 (admin school -> claim issuer)
https://rinkeby.etherscan.io/address/0x72439bba904bf5d4ce83e90a7e7466a74c3cedab#code

### Signer Key
 - Address:    "0x61a12c10676e7ef993d21e3b1da9a137406b9689"
 - PrivateKey: "0xa48de82caf25eb90d81cb42f3fcf788bce60d6d4d8b527c90b8306324b7bfd09"
 - This signer key can be different from school identity owner address.

### ClaimHolder
https://rinkeby.etherscan.io/address/0x6d101888b74715b7669a1faefb594ad9af282b04#code

### ClaimVerifier
https://rinkeby.etherscan.io/address/0xaa24902e67f1669882403530c198bf07c835a91f#code

## Note
Special Thanks to https://github.com/ERC725Alliance/erc725
