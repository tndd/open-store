FROM node:18-alpine

WORKDIR /app

# netcatをインストール（データベース接続待機用）
RUN apk add --no-cache netcat-openbsd

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 全ての依存関係をインストール（devDependenciesも含む）
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

# entrypointスクリプトを最後にコピーして実行可能にする（上書きを防ぐため）
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Prismaクライアントを生成
RUN npx prisma generate

EXPOSE 3000

# entrypointスクリプトを使用してアプリケーションを起動
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]