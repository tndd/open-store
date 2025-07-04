import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetailClient from './ProductDetailClient'


interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  
  // 商品データを取得
  const product = await prisma.item.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  // 商品が見つからない場合は404ページを表示
  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}