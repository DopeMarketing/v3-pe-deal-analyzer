import { createSupabaseServer } from '@/lib/supabase'
import Link from 'next/link'

export default async function ReportsPage() {
  const supabase = await createSupabaseServer()
  
  // TODO: Fetch available reports from comparison_reports table
  // TODO: Load scheduled reports and their status
  // TODO: Get recent report generation history

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Schedule Report
        </button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/reports/irr-analysis" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="text-blue-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">IRR & MOIC Analysis</h3>
          <p className="text-gray-600 text-sm">Calculate returns and performance metrics</p>
        </Link>

        <Link href="/reports/performance" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="text-green-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v8H3v-8zm4-8h2v16H7V5zm4 3h2v13h-2V8zm4-3h2v16h-2V5z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Performance Dashboard</h3>
          <p className="text-gray-600 text-sm">EBITDA trends and margin analysis</p>
        </Link>

        <Link href="/reports/tax-optimization" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="text-purple-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Tax Optimization</h3>
          <p className="text-gray-600 text-sm">Tax strategy recommendations</p>
        </Link>

        <Link href="/reports/investment-committee" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="text-red-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V18h2v-5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V18h2v-5.5c0-2.49-2.01-4.5-4.5-4.5S10 9.01 10 10.5V18H4z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">IC Reports</h3>
          <p className="text-gray-600 text-sm">Executive summaries for committee</p>
        </Link>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
        </div>
        <div className="divide-y">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">Q3 Portfolio Performance Report</h4>
              <p className="text-sm text-gray-500">Generated on Oct 15, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">Download</button>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">IRR Analysis - All Deals</h4>
              <p className="text-sm text-gray-500">Generated on Oct 12, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">Download</button>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">Tax Optimization Recommendations</h4>
              <p className="text-sm text-gray-500">Generated on Oct 8, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">Download</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Scheduled Reports</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Monthly Performance Summary</span>
                <p className="text-sm text-gray-500">Every 1st of the month at 9:00 AM</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Quarterly IRR Analysis</span>
                <p className="text-sm text-gray-500">Every quarter end + 5 days</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}