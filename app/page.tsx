import { Sparkles, Truck, Shield, Heart } from 'lucide-react'
import ProductCard from './components/ProductCard'
import { prisma } from '../lib/prisma'

export default async function Home() {
  // 商品データを取得
  const products = await prisma.item.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-green-600">自然の恵み</span>を<br />
              あなたの食卓に
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              農家直送の新鮮な野菜・果物をお届けします。<br />
              大地の恵みをそのまま、安心・安全な食材を全国にお届けしています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                商品を見る
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200">
                農家について
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">農家直送</h3>
              <p className="text-gray-600 text-sm">産地から直接お届けする新鮮な野菜・果物</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">翌日配送</h3>
              <p className="text-gray-600 text-sm">鮮度を保ったまま迅速にお届け</p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">安心・安全</h3>
              <p className="text-gray-600 text-sm">厳選された生産者による品質保証</p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">地域応援</h3>
              <p className="text-gray-600 text-sm">地域農業を支援し、持続可能な農業を推進</p>
            </div>
          </div>
        </div>
      </section>

      {/* 商品一覧セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              おすすめ商品
            </h2>
            <p className="text-gray-600 text-lg">
              農家さんが丹精込めて育てた新鮮な野菜・果物をお楽しみください
            </p>
          </div>

          {/* 商品グリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  exp: product.exp,
                  body: product.body,
                  images: product.images,
                  user: product.user,
                }}
              />
            ))}
          </div>

          {/* もっと見るボタン */}
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
              商品をもっと見る
            </button>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            新鮮な野菜をお試しください
          </h2>
          <p className="text-green-100 text-lg mb-8">
            初回限定で送料無料。農家直送の美味しさを体験してみませんか？
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
            今すぐ注文する
          </button>
        </div>
      </section>
    </div>
  )
}