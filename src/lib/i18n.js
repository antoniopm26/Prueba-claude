export const LOCALES = { es: 'es-VE', en: 'en-US' }

const es = {
  'nav.home': 'Inicio', 'nav.stats': 'Estadísticas', 'nav.wallet': 'Billetera', 'nav.profile': 'Perfil', 'nav.add': 'Nuevo movimiento',
  'home.hello': 'Hola', 'home.total': 'Saldo total', 'home.income': 'Ingresos', 'home.expense': 'Gastos', 'home.month': 'Este mes',
  'home.quick': 'Accesos rápidos', 'home.recent': 'Últimos movimientos', 'home.seeAll': 'Ver todo',
  'home.noMoves': 'Aún no hay movimientos. Registra el primero con el botón +.', 'home.byCat': 'Gastos por categoría', 'home.noExp': 'Sin gastos este mes.',
  'qa.income': 'Ingreso', 'qa.expense': 'Gasto', 'qa.rates': 'Tasas', 'qa.clear': 'Limpiar',
  'stats.title': 'Estadísticas', 'stats.monthly': 'Ingresos y gastos por mes', 'stats.last6': 'Últimos 6 meses', 'stats.byCat': 'Desglose por categoría',
  'stats.net': 'Neto', 'stats.thisMonth': 'Este mes', 'stats.all': 'Todo', 'stats.empty': 'Sin datos todavía.',
  'wallet.title': 'Billetera', 'wallet.accounts': 'Cuentas', 'wallet.moves': 'Movimientos', 'wallet.add': 'Agregar cuenta', 'wallet.new': 'Nueva cuenta',
  'wallet.save': 'Crear cuenta', 'wallet.all': 'Todos los movimientos',
  'acc.name': 'Nombre', 'acc.namePh': 'Ej: Zelle', 'acc.type': 'Tipo', 'acc.currency': 'Moneda', 'acc.initial': 'Saldo inicial',
  'type.cash': 'Efectivo', 'type.bank': 'Banco', 'type.crypto': 'Cripto', 'type.wallet': 'Billetera digital', 'type.other': 'Otra',
  'form.new': 'Nuevo movimiento', 'form.income': 'Ingreso', 'form.expense': 'Gasto', 'form.date': 'Fecha', 'form.desc': 'Descripción',
  'form.descPh': 'Ej: Supermercado', 'form.cat': 'Categoría', 'form.amount': 'Monto', 'form.currency': 'Moneda', 'form.account': 'Cuenta',
  'form.save': 'Guardar movimiento', 'form.err': 'Ingresa un monto mayor a 0.',
  'profile.title': 'Perfil', 'profile.name': 'Nombre', 'profile.namePh': 'Tu nombre', 'profile.prefs': 'Preferencias', 'profile.lang': 'Idioma',
  'profile.currency': 'Moneda principal', 'profile.rates': 'Tasas de cambio',
  'profile.ratesHint': 'Cuántos Bs vale 1 unidad de cada moneda. Todo se convierte a USD para los cálculos.',
  'profile.danger': 'Zona de riesgo', 'profile.clearMoves': 'Borrar movimientos', 'profile.clearAll': 'Borrar todos los datos',
  'profile.dangerHint': 'Los datos viven solo en este navegador. Estas acciones no se pueden deshacer.',
  'rates.title': 'Tasas de cambio', 'rates.done': 'Listo', 'rates.per': 'Bs por 1 {cur}',
  'confirm.cancel': 'Cancelar', 'confirm.ok': 'Confirmar', 'confirm.delMove': '¿Eliminar este movimiento?',
  'confirm.clearMoves': '¿Borrar todos los movimientos? Las cuentas se conservan.',
  'confirm.clearAll': '¿Borrar todos los datos? Se eliminan movimientos, cuentas, tasas y perfil.',
  'confirm.delAcc': '¿Eliminar la cuenta "{name}" y todos sus movimientos?',
  'cat.food': 'Comida', 'cat.transport': 'Transporte', 'cat.home': 'Hogar', 'cat.health': 'Salud', 'cat.fun': 'Ocio', 'cat.shopping': 'Compras',
  'cat.bills': 'Servicios', 'cat.otherExp': 'Otros gastos', 'cat.salary': 'Salario', 'cat.sales': 'Ventas', 'cat.freelance': 'Freelance',
  'cat.invest': 'Inversiones', 'cat.gift': 'Regalos', 'cat.otherInc': 'Otros ingresos',
}

const en = {
  'nav.home': 'Home', 'nav.stats': 'Stats', 'nav.wallet': 'Wallet', 'nav.profile': 'Profile', 'nav.add': 'New transaction',
  'home.hello': 'Hello', 'home.total': 'Total balance', 'home.income': 'Income', 'home.expense': 'Expenses', 'home.month': 'This month',
  'home.quick': 'Quick actions', 'home.recent': 'Latest transactions', 'home.seeAll': 'See all',
  'home.noMoves': 'No transactions yet. Add the first one with the + button.', 'home.byCat': 'Expenses by category', 'home.noExp': 'No expenses this month.',
  'qa.income': 'Income', 'qa.expense': 'Expense', 'qa.rates': 'Rates', 'qa.clear': 'Clear',
  'stats.title': 'Statistics', 'stats.monthly': 'Income and expenses by month', 'stats.last6': 'Last 6 months', 'stats.byCat': 'Breakdown by category',
  'stats.net': 'Net', 'stats.thisMonth': 'This month', 'stats.all': 'All time', 'stats.empty': 'No data yet.',
  'wallet.title': 'Wallet', 'wallet.accounts': 'Accounts', 'wallet.moves': 'Transactions', 'wallet.add': 'Add account', 'wallet.new': 'New account',
  'wallet.save': 'Create account', 'wallet.all': 'All transactions',
  'acc.name': 'Name', 'acc.namePh': 'E.g. Zelle', 'acc.type': 'Type', 'acc.currency': 'Currency', 'acc.initial': 'Initial balance',
  'type.cash': 'Cash', 'type.bank': 'Bank', 'type.crypto': 'Crypto', 'type.wallet': 'Digital wallet', 'type.other': 'Other',
  'form.new': 'New transaction', 'form.income': 'Income', 'form.expense': 'Expense', 'form.date': 'Date', 'form.desc': 'Description',
  'form.descPh': 'E.g. Groceries', 'form.cat': 'Category', 'form.amount': 'Amount', 'form.currency': 'Currency', 'form.account': 'Account',
  'form.save': 'Save transaction', 'form.err': 'Enter an amount greater than 0.',
  'profile.title': 'Profile', 'profile.name': 'Name', 'profile.namePh': 'Your name', 'profile.prefs': 'Preferences', 'profile.lang': 'Language',
  'profile.currency': 'Main currency', 'profile.rates': 'Exchange rates',
  'profile.ratesHint': 'How many Bs 1 unit of each currency is worth. Everything is converted to USD for calculations.',
  'profile.danger': 'Danger zone', 'profile.clearMoves': 'Delete transactions', 'profile.clearAll': 'Delete all data',
  'profile.dangerHint': 'Data lives only in this browser. These actions cannot be undone.',
  'rates.title': 'Exchange rates', 'rates.done': 'Done', 'rates.per': 'Bs per 1 {cur}',
  'confirm.cancel': 'Cancel', 'confirm.ok': 'Confirm', 'confirm.delMove': 'Delete this transaction?',
  'confirm.clearMoves': 'Delete all transactions? Accounts are kept.',
  'confirm.clearAll': 'Delete all data? Transactions, accounts, rates and profile will be removed.',
  'confirm.delAcc': 'Delete account "{name}" and all its transactions?',
  'cat.food': 'Food', 'cat.transport': 'Transport', 'cat.home': 'Home', 'cat.health': 'Health', 'cat.fun': 'Leisure', 'cat.shopping': 'Shopping',
  'cat.bills': 'Bills', 'cat.otherExp': 'Other expenses', 'cat.salary': 'Salary', 'cat.sales': 'Sales', 'cat.freelance': 'Freelance',
  'cat.invest': 'Investments', 'cat.gift': 'Gifts', 'cat.otherInc': 'Other income',
}

export const DICTS = { es, en }

export function translate(lang, key, vars) {
  let s = DICTS[lang]?.[key] ?? DICTS.es[key] ?? key
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, vars[k])
  return s
}
