'use client'

import { Calendar, MapPin, Star, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'
import { useState } from 'react'

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

interface Product {
  id: string
  name: string
  price: number
  exp: Date
  body: string
  images: string[]
  user?: {
    name: string
  }
}

interface Props {
  product: Product
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  const getDaysUntilExpiry = (exp: Date) => {
    const now = new Date()
    const expiry = new Date(exp)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilExpiry(product.exp)
  const isExpiringSoon = daysLeft <= 3 && daysLeft > 0

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // カートにアイテムを追加
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        user: product.user
      })
    }

    // フィードバック用の短い遅延
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1) // 数量をリセット
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 商品画像セクション */}
          <div className="space-y-4">
            {/* メイン画像 */}
            <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                <div className="text-9xl opacity-80">
                  {getProductEmoji(product.name)}
                </div>
              </div>

              {/* 消費期限バッジ */}
              {isExpiringSoon && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                  あと{daysLeft}日
                </div>
              )}

              {/* 新鮮バッジ */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current" />
                <span>新鮮</span>
              </div>
            </div>

            {/* サブ画像（将来的にギャラリー機能） */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-2xl opacity-60">
                    {getProductEmoji(product.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 商品情報セクション */}
          <div className="space-y-6">
            {/* 商品名 */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {product.user?.name && `生産者: ${product.user.name}`}
              </p>
            </div>

            {/* 価格 */}
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">/ 個</span>
            </div>

            {/* 商品説明 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">商品について</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.body}
              </p>
            </div>

            {/* メタ情報 */}
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                <span>消費期限: {formatDate(product.exp)}</span>
              </div>
              {product.user && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <span>生産者: {product.user.name}</span>
                </div>
              )}
            </div>

            {/* 数量選択とカートに追加 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  数量
                </label>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-xl font-medium text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* カートに追加ボタン */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 text-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{isAdding ? 'カートに追加中...' : 'カートに追加'}</span>
              </button>

              {/* 今すぐ購入ボタン */}
              <button className="w-full border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg">
                今すぐ購入
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}