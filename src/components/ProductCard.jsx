import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const lowestPrice = Math.min(...product.variants.map(v => v.price))
  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-blue-600">₹{lowestPrice.toLocaleString()}</span>
            <span className="text-xs text-gray-500">starting</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
