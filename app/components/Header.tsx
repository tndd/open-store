'use client'

import { ShoppingCart, Search, User, Leaf } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">Open Store</h1>
            <span className="text-sm text-green-600 font-medium">自然の恵み</span>
          </div>

          {/* 検索バー */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="新鮮な野菜、果物を検索..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden sm:block">ログイン</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">カート</span>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}