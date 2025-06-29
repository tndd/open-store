FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 全ての依存関係をインストール（devDependenciesも含む）
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

# Prismaクライアントを生成
RUN npx prisma generate

# Next.jsをビルド
RUN npm run build

EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]