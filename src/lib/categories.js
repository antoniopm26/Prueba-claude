import {
  Utensils, Car, Home, HeartPulse, Gamepad2, ShoppingBag, Receipt, MoreHorizontal,
  Briefcase, Store, Laptop, TrendingUp, Gift,
} from 'lucide-react'

export const EXPENSE_CATS = [
  { key: 'food', icon: Utensils },
  { key: 'transport', icon: Car },
  { key: 'home', icon: Home },
  { key: 'health', icon: HeartPulse },
  { key: 'fun', icon: Gamepad2 },
  { key: 'shopping', icon: ShoppingBag },
  { key: 'bills', icon: Receipt },
  { key: 'otherExp', icon: MoreHorizontal },
]

export const INCOME_CATS = [
  { key: 'salary', icon: Briefcase },
  { key: 'sales', icon: Store },
  { key: 'freelance', icon: Laptop },
  { key: 'invest', icon: TrendingUp },
  { key: 'gift', icon: Gift },
  { key: 'otherInc', icon: MoreHorizontal },
]

export const catsFor = (type) => (type === 'income' ? INCOME_CATS : EXPENSE_CATS)
export const catIcon = (key) =>
  [...EXPENSE_CATS, ...INCOME_CATS].find((c) => c.key === key)?.icon ?? MoreHorizontal

// Paleta para barras por categoría (azules de marca + acentos distinguibles)
export const CAT_COLORS = ['#3D7FFF', '#F59E0B', '#10B981', '#F472B6', '#A78BFA', '#22D3EE', '#FB7185', '#94A3B8']
