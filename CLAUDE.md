# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - 開発サーバー起動（Turbopack使用）
- `npm run build` - プロダクションビルド
- `npm start` - ビルド済みアプリの起動
- `npm run lint` - ESLintによるコードチェック

## プロジェクト概要

ECサイト「Open Store」の開発プロジェクト。段階的開発により、まずBUY権限（購入者）機能のみを実装し、SELL・ADMIN権限は将来実装とする。

## 技術スタック

- Next.js 15.3.4 + React 19 + TypeScript
- Tailwind CSS v4
- Auth.js (NextAuth) + マジックリンク認証（予定）
- データベース未定

## アーキテクチャ上の重要な制約

### データベース設計の重要ポイント

1. **商品のバージョン管理**:
   - `Item.product_id`: 商品の概念的ID
   - `Item.id`: 特定バージョンのID（TransactElementはこちらを参照）
   - 商品は編集不可、変更時は新バージョン作成

2. **User-Address段階的登録**:
   - 新規ユーザー作成時：メールのみでUser作成、address_id=NULL
   - 初回購入時：住所入力 → Address作成 → User.address_id更新の順次処理
   - Address初登録時のaddress_id登録漏れに注意すること

3. **取引データの不変性**:
   - Transaction/TransactElementは原則削除・編集禁止
   - 注文履歴保護のため住所情報も後出し変更不可

### 権限システム

- BUY: 購入者（初期実装対象）
- SELL: 販売者（モック予定）
- ADMIN: 管理者（モック予定）

## 言語設定

- 日本語でコメント・コミットメッセージを記述
- ファイル編集時、日本語コンテンツはWriteツール使用（Edit/MultiEditは文字化けリスク）

## ドキュメント構成

- `docs/database.md`: テーブル定義
- `docs/screens.md`: 画面仕様
- `docs/security.md`: セキュリティ設計
- `docs/design-philosophy.md`: 設計思想