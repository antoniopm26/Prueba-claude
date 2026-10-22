# TF Finance

App web de finanzas personales (React + Vite + Tailwind CSS). Todos los datos se guardan en `localStorage`; no hay backend.

- **Inicio**: saldo total, ingresos/gastos del mes, accesos rápidos, últimos movimientos y gastos por categoría.
- **Estadísticas**: ingresos vs. gastos por mes y desglose por categoría (recharts).
- **Billetera**: cuentas (Efectivo, Banco, Binance, PayPal + las que agregues) y movimientos.
- **Perfil**: nombre, idioma (ES/EN), moneda principal, tasas de cambio (USD, EUR, USDT en Bs) y zona de riesgo.

Multi-moneda (USD, EUR, Bs, USDT): todo se convierte a USD para los cálculos usando las tasas configurables.

```bash
npm install
npm run dev     # desarrollo
npm run build   # producción
```
