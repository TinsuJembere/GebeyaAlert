'use client'

interface PriceCardProps {
  cropName: string
  marketName: string
  price: number
}

export default function PriceCard({
  cropName,
  marketName,
  price,
}: PriceCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">{cropName}</p>
          <p className="text-sm text-gray-600">{marketName}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            {price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">ETB</p>
        </div>
      </div>
    </div>
  )
}
















