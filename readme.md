
# BlockBase for blockchain_hk2019tokyo
![alt text](https://github.com/block-base/blockchain_hk2019tokyo_demo/blob/master/doc/logo.png)

## 成果物
 - 学位&ポートフォリオ管理システムのプロトコルとパッケージ
 - 今回のハッカソンでは大学で運用することを前提として開発を行う

### Demo
https://unruffled-goldstine-7cbed9.netlify.com/#/

### ソースコード
https://github.com/block-base/blockchain_hk2019tokyo_demo/tree/master/submit

### Video
https://www.dropbox.com/sh/p1h9o28fkencql9/AACQQoit_rN_eMNUuyN5pe1-a?dl=0&preview=DigiD_demo.mp4

### プレゼン資料

### デモ動画

## アイデンティティのコンセプト
 - 認証情報が一個のアイデンティティに集約されている
 - ユーザーは用途ごとに使いわけて見せることができる

## 目指したいこと
 - 技術面の実装が確実にできている
 - 運用面の課題が適切に検討できている
 - GDPR等の法令対応も考慮できている

# Implementation

## 機能検証
https://github.com/block-base/blockchain_hk2019tokyo_demo/tree/master/sample

## Technical
 - nuxt.js
 - ERC725v2

### データの保管(IPFS)と暗号化
https://github.com/block-base/blockchain_hk2019tokyo_demo/tree/master/sample/ipfs

## スケジュールと役割分担の予定
### 2/16
#### 9:00-12:00
 - Yamamura: GDPR等の法令対応
 - Marimo：デザイン、大学での運用整理
 - Tanaka：IPFSの機能検証
 - Sanagi：スマコンの機能検証

#### 12:00-16:00
 - プロトタイプ統合 (役割分担して、課題を考える、実装を深掘りする人がいてもいいかも)
 - QRコード

#### 16:00-18:00
 - 運用面の課題の洗い出しと対策の検討
 - プレゼン資料のスケッチ

### 2/17
#### 9:00-12:00
 - 資料作成

#### 12:30
 - 提出
 - ソースコード
 - 発表用資料
 - 動画(任意)

## 実スケジュール
 - ERC725のv2にアップデート対応に想定以上の時間がかかった
 - イーサリアムウォレットの公開鍵で暗号化し、秘密鍵で復元するロジックの検証に時間がかかった
 - 2日目の発表準備は計画通り実施できた
