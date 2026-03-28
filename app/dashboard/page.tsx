import { createSupabaseServer } from '@/lib/supabase'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  
  // TODO: Fetch portfolio summary metrics from deals and performance_metrics tables
  // TODO: Get recent deals from deals table ordered by created_at
  // TODO: Load performance data for charts from financial_statements
  // TODO: Fetch active alerts from performance_alerts table

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Generate Report
        </button>
      </div>

      {/* Portfolio Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
          <p className="text-2xl font-semibold text-gray-900">$245.2M</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Deals</h3>
          <p className="text-2xl font-semibold text-gray-900">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg IRR</h3>
          <p className="text-2xl font-semibold text-green-600">18.4%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg MOIC</h3>
          <p className="text-2xl font-semibold text-green-600">2.8x</p>
        </div>
      </div>

      {/* Performance Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">Performance Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">EBITDA Trends</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">EBITDA Chart Placeholder</span>
          </div>
        </div>
      </div>

      {/* Recent Deals Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Recent Deals</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">TechCorp Acquisition</span>
              <span className="text-green-600">$15.2M</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Manufacturing Co</span>
              <span className="text-green-600">$8.7M</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">SaaS Startup</span>
              <span className="text-green-600">$12.1M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}