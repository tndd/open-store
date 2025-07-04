'use client'

import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

// 商品名に応じた絵文字を返す関数
function getProductEmoji(name: string): string {
  if (name.includes('りんご') || name.includes('アップル')) return '🍎'
  if (name.includes('バナナ')) return '🍌'
  if (name.includes('みかん') || name.includes('オレンジ')) return '🍊'
  if (name.includes('トマト')) return '🍅'
  if (name.includes('米') || name.includes('コシヒカリ')) return '🌾'
  if (name.includes('パン') || name.includes('食パン')) return '🍞'
  if (name.includes('にんじん') || name.includes('人参')) return '🥕'
  if (name.includes('レタス') || name.includes('キャベツ')) return '🥬'
  if (name.includes('きゅうり') || name.includes('胡瓜')) return '🥒'
  if (name.includes('なす') || name.includes('茄子')) return '🍆'
  if (name.includes('とうもろこし') || name.includes('コーン')) return '🌽'
  if (name.includes('じゃがいも') || name.includes('ポテト')) return '🥔'
  if (name.includes('玉ねぎ') || name.includes('たまねぎ')) return '🧅'
  return '🥬' // デフォルトは葉物野菜
}

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              カートは空です
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              新鮮な商品を探してみませんか？
            </p>
            <Link href="/">
              <button className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <ArrowLeft className="h-5 w-5" />
                <span>商品を見る</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ショッピングカート
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {totalItems}点の商品
          </p>
        </div>
        <Link href="/">
          <button className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>買い物を続ける</span>
          </button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* カートアイテム一覧 */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4">
                {/* 商品画像 */}
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-gray-600 dark:to-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-3xl opacity-80">
                    {getProductEmoji(item.name)}
                  </div>
                </div>

                {/* 商品情報 */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">
                      {item.name}
                    </h3>
                  </Link>
                  {item.user && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      生産者: {item.user.name}
                    </p>
                  )}
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                    {formatPrice(item.price)} / 個
                  </p>
                </div>

                {/* 数量コントロール */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* 小計と削除ボタン */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors mt-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* カートをクリアボタン */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm"
            >
              カートを空にする
            </button>
          </div>
        </div>

        {/* 注文サマリー */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              注文サマリー
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">小計</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">配送料</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  無料
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-gray-100">合計</span>
                  <span className="text-green-600 dark:text-green-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200">
                レジに進む
              </button>
              <button className="w-full border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-200">
                見積もりを保存
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}