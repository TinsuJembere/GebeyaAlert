'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { apiClient } from '@/lib/api'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import Link from 'next/link'

interface PriceData {
  id: number
  crop_name: string
  crop_type?: string
  market_name: string
  price: number
  price_change_7d: number
  trend: string
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { t } = useLanguage()
  const [marketPrices, setMarketPrices] = useState<PriceData[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchMarketData = async () => {
      try {
        setDataLoading(true)
        const prices = await apiClient.getLatestPrices()
        setMarketPrices(prices)
      } catch (err) {
        setError(t('failedToLoad'))
      } finally {
        setDataLoading(false)
      }
    }

    fetchMarketData()
  }, [user, t])

  const getTrendInfo = (change: number) => {
    if (change > 0) return { text: t('rising'), color: 'text-green-500', icon: '⬆' }
    if (change < 0) return { text: t('falling'), color: 'text-red-500', icon: '⬇' }
    return { text: t('stable'), color: 'text-gray-500', icon: '—' }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">{t('loading')}</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t('welcome')}
          </h1>
          <Link
            href="/alerts/new"
            className="inline-block px-8 py-4 bg-[#4ce434] hover:bg-[#45cc2f] text-white font-bold rounded-2xl transition-colors shadow-sm"
          >
            {t('setPriceAlert')}
          </Link>
        </div>

        {/* Today's Market Prices Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('todaysMarketPrices')}</h2>
          
          {dataLoading && (
            <div className="text-center py-8 text-gray-500">{t('loading')}</div>
          )}
          
          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}
          
          {!dataLoading && !error && marketPrices.length === 0 && (
            <div className="text-center py-8 text-gray-500">{t('noMarketPrices')}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketPrices.map((item) => {
              const trend = getTrendInfo(item.price_change_7d || 0)
              return (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg text-gray-900">{item.crop_name}</div>
                    {item.crop_type && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {item.crop_type}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {item.market_name}
                  </div>
                  <div className="text-3xl font-bold text-[#4ce434] mb-3">
                    {item.price.toFixed(0)} ETB
                  </div>
                  <div className={`text-sm font-medium flex items-center gap-1 ${trend.color}`}>
                    <span>{trend.icon}</span>
                    <span>{trend.text}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}