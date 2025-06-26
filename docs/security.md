# セキュリティ仕様

## ログイン認証

認証システムには、**Auth.js（NextAuth）+ マジックリンク認証**を使用する。

**技術仕様:**
- **認証プロバイダー**: Auth.js EmailProvider
- **セッション管理**: JWT（JSON Web Token）
- **メール送信**: SendGrid / Resend / Amazon SES等
- **セッション有効期限**: 90日間
- **マジックリンク有効期限**: 15分間

## セキュリティ対策

- **HTTPS必須**: 本番環境では必ずHTTPS通信
- **CORS設定**: 許可されたドメインからのみAPI呼び出し可能
- **CSP設定**: Content Security Policyでスクリプト実行を制限
- **Rate Limiting**: メール送信の頻度制限
- **メール検証**: 一意制約により重複登録を防止