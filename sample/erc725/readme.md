# ERC725

## Concept
This is sample for ERC725.

## 検討事項
 - ERC725のIdentityとKeyManagementシステムとの連携
 - 秘密鍵を無くした場合のリカバリー方法

## Implementation Note
### ERC725のIdentityとERC734のKeyManagementとの連携
 - IdentityはERC725に準拠しプロキシとして動作する。
 - KeyManagementはERC734に準拠し各種認証情報を保管する。
 - ユーザーはIdentityとKeyManagementをデプロイする。
 - IdentityのKeyにKeyManagementを設定する。
 - KeyManagementの管理アカウントにIdentityを設定する。
 - ユーザーはIdentityをプロキシとしてKeyManagementに認証情報を保管する。

### 秘密鍵を無くした場合のリカバリー方法


## Actual Implementation
 - ユーザーがIdentityをデプロイできる。
 - ユーザーがIdentityをオーナーとしたKeyManagementを登録できる。
 - ユーザーがKeyManagementに認証情報を登録できる。

### Identity
- 0xaad0bb0dFfaEF8C2b0C07Dc9Ba9603083E8bE1f5
https://rinkeby.etherscan.io/address/0xb6b23f917d1ff382754cd891f84788248d39a496#code



### KeyManager
https://rinkeby.etherscan.io/address/0x3c1e4b64ac51ba144604b485aafc256d6690f0e0#code

## Note
Special Thanks to https://github.com/ERC725Alliance/erc725