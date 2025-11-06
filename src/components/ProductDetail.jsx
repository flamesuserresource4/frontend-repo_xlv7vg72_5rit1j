import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import EMIPlanSelector from './EMIPlanSelector'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [variantIndex, setVariantIndex] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/products/${slug}`)
        if (!res.ok) throw new Error('Failed to load product')
        const data = await res.json()
        setProduct(data)
        setSelectedPlan(data.emi_plans?.[0] || null)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!product) return null

  const variant = product.variants[variantIndex]

  const proceed = () => {
    alert(`Proceeding with ${product.name} - ${variant.name} using ${selectedPlan.tenure_months} months plan at ₹${selectedPlan.monthly_payment.toLocaleString()} per month`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline">← Back to products</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="bg-white rounded-xl overflow-hidden border">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, idx) => (
                <button
                  key={v.sku}
                  onClick={() => setVariantIndex(idx)}
                  className={`px-3 py-1.5 rounded border text-sm ${
                    idx === variantIndex ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{variant.price.toLocaleString()}</span>
              <span className="text-sm line-through text-gray-400">₹{variant.mrp.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Choose an EMI plan</h3>
            <EMIPlanSelector plans={product.emi_plans} onSelect={setSelectedPlan} />
          </div>

          <button
            onClick={proceed}
            disabled={!selectedPlan}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
          >
            Proceed with selected plan
          </button>
        </div>
      </div>
    </div>
  )
}
