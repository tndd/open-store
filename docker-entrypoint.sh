#!/bin/bash
set -e

echo "データベース接続を待機中..."

# PostgreSQLの接続を待機
until nc -z postgres 5432; do
  echo "PostgreSQLが利用可能になるまで待機中..."
  sleep 2
done

echo "PostgreSQLに接続できました。マイグレーションを実行します..."

# マイグレーションを実行
npm run db:migrate

echo "マイグレーションが完了しました。シードデータを投入します..."

# シードデータを投入
npm run db:seed

echo "初期化が完了しました。Next.jsをビルドします..."

# Next.jsをビルド（マイグレーション後）
npm run build

echo "ビルドが完了しました。アプリケーションを起動します..."

# アプリケーションを起動
exec "$@"