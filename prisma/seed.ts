import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('シードデータの作成を開始します...')

  // ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      name: '田中太郎',
      email: 'tanaka@example.com',
      role: 'BUY',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: '佐藤花子',
      email: 'sato@example.com',
      role: 'SELL',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: '鈴木二郎',
      email: 'suzuki@example.com',
      role: 'BUY',
    },
  })

  // 住所の作成
  const address1 = await prisma.address.create({
    data: {
      userId: user1.id,
      name: '自宅',
      phone: '090-1234-5678',
      address: '東京都渋谷区恵比寿1-1-1',
    },
  })

  const address2 = await prisma.address.create({
    data: {
      userId: user2.id,
      name: '自宅',
      phone: '090-2345-6789',
      address: '神奈川県横浜市西区みなとみらい2-2-2',
    },
  })

  const address3 = await prisma.address.create({
    data: {
      userId: user3.id,
      name: '自宅',
      phone: '090-3456-7890',
      address: '大阪府大阪市北区梅田3-3-3',
    },
  })

  // ユーザーのデフォルト住所を設定
  await prisma.user.update({
    where: { id: user1.id },
    data: { addressId: address1.id },
  })

  await prisma.user.update({
    where: { id: user2.id },
    data: { addressId: address2.id },
  })

  await prisma.user.update({
    where: { id: user3.id },
    data: { addressId: address3.id },
  })

  // 商品の作成
  const items = [
    {
      productId: 'apple-001',
      name: '青森県産りんご',
      price: 300,
      exp: new Date('2025-02-28'),
      body: '新鮮で甘い青森県産のりんごです。シャキシャキとした食感が特徴的で、朝食やおやつにぴったりです。',
      images: ['/images/apple-main.jpg', '/images/apple-sub1.jpg'],
      userId: user2.id,
    },
    {
      productId: 'banana-001',
      name: 'フィリピン産バナナ',
      price: 200,
      exp: new Date('2025-01-15'),
      body: '甘くて栄養豊富なフィリピン産バナナです。エネルギー補給に最適で、スポーツ前後にもおすすめです。',
      images: ['/images/banana-main.jpg'],
      userId: user2.id,
    },
    {
      productId: 'orange-001',
      name: '愛媛県産みかん',
      price: 150,
      exp: new Date('2025-01-31'),
      body: '愛媛県で丁寧に育てられたみかんです。甘酸っぱい味わいが特徴で、ビタミンCが豊富に含まれています。',
      images: ['/images/orange-main.jpg', '/images/orange-sub1.jpg', '/images/orange-sub2.jpg'],
      userId: user2.id,
    },
    {
      productId: 'tomato-001',
      name: '熊本県産トマト',
      price: 250,
      exp: new Date('2025-01-20'),
      body: '熊本県の豊かな土壌で育った甘いトマトです。サラダや料理の材料として幅広くご利用いただけます。',
      images: ['/images/tomato-main.jpg'],
      userId: user2.id,
    },
    {
      productId: 'rice-001',
      name: '新潟県産コシヒカリ',
      price: 500,
      exp: new Date('2025-12-31'),
      body: '新潟県産の最高級コシヒカリです。ふっくらとした炊き上がりと甘みが自慢の一品です。',
      images: ['/images/rice-main.jpg', '/images/rice-sub1.jpg'],
      userId: user2.id,
    },
    {
      productId: 'bread-001',
      name: '手作り食パン',
      price: 400,
      exp: new Date('2025-01-10'),
      body: '毎朝手作りで焼き上げる食パンです。ふわふわの食感と小麦の香りが楽しめます。',
      images: ['/images/bread-main.jpg'],
      userId: user2.id,
    },
  ]

  for (const item of items) {
    await prisma.item.create({
      data: item,
    })
  }

  console.log('シードデータの作成が完了しました！')
  console.log(`作成されたユーザー: ${3}人`)
  console.log(`作成された住所: ${3}件`)
  console.log(`作成された商品: ${items.length}件`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })