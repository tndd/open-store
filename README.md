# Open Store

オープンなECサイト開発プロジェクト

## 目次

- [データベース設計](docs/database.md) - テーブル定義とデータモデル
- [画面設計](docs/screens.md) - アプリ画面の仕様と構成
- [セキュリティ仕様](docs/security.md) - 認証・セキュリティ設計
- [設計思想](docs/design-philosophy.md) - プロジェクトの設計コンセプト

## 開発方針

- **段階的開発**: BUY権限（購入者）機能から実装開始
- **モック優先**: SELL・ADMIN権限機能は将来実装
- **PC前提**: レスポンシブデザインは後回し

## 技術スタック

- **フレームワーク**: Next.js
- **認証**: Auth.js (NextAuth) + マジックリンク
- **データベース**: (未定)
- **スタイリング**: (未定)

## プロジェクト構成

```
open-store/
├── docs/           # プロジェクト仕様書
│   ├── database.md      # テーブル定義
│   ├── screens.md       # 画面設計
│   ├── security.md      # セキュリティ仕様
│   └── design-philosophy.md  # 設計思想
└── README.md       # プロジェクト概要（このファイル）
```