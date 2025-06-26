import { Calendar, MapPin, Star } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'numeric',
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

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* 商品画像 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {/* ダミー画像の代わりに商品に応じた絵文字 */}
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
            <div className="text-6xl opacity-80">
              {getProductEmoji(product.name)}
            </div>
          </div>
        </div>
        
        {/* 消費期限バッジ */}
        {isExpiringSoon && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            あと{daysLeft}日
          </div>
        )}
        
        {/* 新鮮バッジ */}
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Star className="h-3 w-3 fill-current" />
          <span>新鮮</span>
        </div>
      </div>

      {/* 商品情報 */}
      <div className="p-4">
        {/* 商品名 */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* 価格 */}
        <div className="flex items-baseline space-x-1 mb-3">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">/ 個</span>
        </div>

        {/* 説明文 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.body}
        </p>

        {/* メタ情報 */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>消費期限: {formatDate(product.exp)}</span>
          </div>
          {product.user && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>生産者: {product.user.name}</span>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 active:scale-[0.98] transform">
          カートに追加
        </button>
      </div>
    </div>
  )
}