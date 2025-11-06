import { Link } from 'react-router-dom'
import { ShoppingBag, Home } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 text-white grid place-items-center">
            <Home size={18} />
          </div>
          <span className="font-semibold text-gray-900">EMI Store</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a href="/test" className="hover:text-gray-900">Backend Test</a>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md">
            <ShoppingBag size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </header>
  )
}
