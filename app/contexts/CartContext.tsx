'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

// カートアイテムの型定義
export interface CartItem {
  id: string           // 商品ID
  name: string         // 商品名
  price: number        // 単価
  quantity: number     // 数量
  images: string[]     // 商品画像
  user?: {
    name: string       // 生産者名
  }
}

// カート状態の型定義
interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

// アクションの型定義
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

// カートの状態管理
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // 既存のアイテムの数量を増やす
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return calculateCartTotals({ ...state, items: updatedItems })
      } else {
        // 新しいアイテムを追加
        const newItem = { ...action.payload, quantity: 1 }
        const updatedItems = [...state.items, newItem]
        return calculateCartTotals({ ...state, items: updatedItems })
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id)
      return calculateCartTotals({ ...state, items: updatedItems })
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        // 数量が0以下の場合はアイテムを削除
        const updatedItems = state.items.filter(item => item.id !== action.payload.id)
        return calculateCartTotals({ ...state, items: updatedItems })
      } else {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        return calculateCartTotals({ ...state, items: updatedItems })
      }
    }
    
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 }
    
    case 'LOAD_CART':
      return calculateCartTotals({ ...state, items: action.payload })
    
    default:
      return state
  }
}

// カートの合計を計算する関数
function calculateCartTotals(state: { items: CartItem[] }): CartState {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  return {
    items: state.items,
    totalItems,
    totalPrice
  }
}

// Context定義
interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// localStorage キー
const CART_STORAGE_KEY = 'open-store-cart'

// CartProvider コンポーネント
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0
  })

  // 初期化時にlocalStorageからカートデータを読み込み
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const cartItems = JSON.parse(savedCart) as CartItem[]
        dispatch({ type: 'LOAD_CART', payload: cartItems })
      }
    } catch (error) {
      console.error('カートデータの読み込みに失敗しました:', error)
    }
  }, [])

  // カート状態が変更されたらlocalStorageに保存
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    } catch (error) {
      console.error('カートデータの保存に失敗しました:', error)
    }
  }, [state.items])

  // アクション関数
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// カスタムフック
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}