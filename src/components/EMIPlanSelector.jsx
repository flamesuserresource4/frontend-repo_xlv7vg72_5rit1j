import { useState } from 'react'

export default function EMIPlanSelector({ plans = [], onSelect }) {
  const [selected, setSelected] = useState(0)

  const handleSelect = (idx) => {
    setSelected(idx)
    onSelect?.(plans[idx])
  }

  return (
    <div className="space-y-3">
      {plans.map((plan, idx) => (
        <button
          key={`${plan.tenure_months}-${idx}`}
          onClick={() => handleSelect(idx)}
          className={`w-full text-left border rounded-lg p-4 transition-colors ${
            selected === idx ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly</p>
              <p className="text-xl font-semibold text-gray-900">₹{plan.monthly_payment.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="text-lg font-medium text-gray-900">{plan.tenure_months} months</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">Interest: {plan.interest_rate}%</span>
            {plan.cashback ? (
              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">{plan.cashback}</span>
            ) : (
              <span className="text-gray-400">No cashback</span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
