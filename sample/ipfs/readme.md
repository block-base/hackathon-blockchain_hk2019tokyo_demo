
# データの保管(IPFS)と暗号化

#### 検証項目
 - データを分散的に保存出来ているIPFS)
 - データは暗号化され、ユーザーは用途毎に使い分けて見せる事が出来る

#### 機能概要
1.Aliceのrandom keyを使ってDataを暗号化(cipher text)
2.暗号化したDataをIPFSにアップロード
3.Bobの公開鍵とAliceのrandom Keyを使って再暗号化鍵を生成
4.再暗号化鍵をBobの秘密鍵で復元するとAliceのrandom keyが取得できる
5.Aliceのrandom keyを用いてIPFS上にあるcipher textを復号し、元データを確認

#### 課題
random keyの使い回しによる元データの流失