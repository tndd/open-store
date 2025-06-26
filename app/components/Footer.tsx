import { Leaf, Heart, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Open Store</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              農家直送の新鮮な野菜・果物をお届けします。<br />
              自然の恵みを大切に、安心・安全な食材を全国にお届けしています。
            </p>
            <div className="flex items-center space-x-1 text-green-600">
              <Heart className="h-4 w-4" />
              <span className="text-sm">地球と人にやさしい農業を応援</span>
            </div>
          </div>

          {/* リンク */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition-colors">商品一覧</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">農家について</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">配送について</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">よくある質問</a></li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">お問い合わせ</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span>info@openstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span>0120-123-456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>営業時間: 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Open Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}