'use client'

import { ShoppingCart, Search, User, Leaf, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

export default function Header() {
  const { theme, toggleTheme, mounted } = useTheme()
  const { totalItems } = useCart()

  // hydration完了まで待機
  if (!mounted) {
    return (
      <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-800">Open Store</h1>
              <span className="text-sm text-green-600 font-medium">自然の恵み</span>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="新鮮な野菜、果物を検索..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors text-gray-900"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="p-2 text-gray-700 rounded-full w-9 h-9"></div>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">ログイン</span>
              </button>
              <Link href="/cart">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:block">カート</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-green-100 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">Open Store</h1>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">自然の恵み</span>
          </div>

          {/* 検索バー */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="新鮮な野菜、果物を検索..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex items-center space-x-6">
            {/* ダークモードトグル */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="テーマ切り替え"
              title={`現在: ${theme}モード`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden sm:block">ログイン</span>
            </button>
            <Link href="/cart">
              <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:block">カート</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}