import { createSupabaseServer } from '@/lib/supabase'
import Link from 'next/link'

export default async function PortfolioPage() {
  const supabase = await createSupabaseServer()
  
  // TODO: Fetch all portfolio companies with deal counts and financial summary
  // TODO: Load latest financial statements for each company
  // TODO: Calculate performance metrics for display

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Companies</h1>
        <Link 
          href="/portfolio/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Company
        </Link>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
          <p className="text-2xl font-semibold text-gray-900">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg EBITDA Margin</h3>
          <p className="text-2xl font-semibold text-green-600">24.8%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-semibold text-gray-900">$187.4M</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search companies..." 
            className="flex-1 border rounded px-3 py-2"
          />
          <select className="border rounded px-3 py-2">
            <option>All Industries</option>
            <option>Technology</option>
            <option>Manufacturing</option>
            <option>Healthcare</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>All Stages</option>
            <option>Growth</option>
            <option>Mature</option>
            <option>Exit Ready</option>
          </select>
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">TechCorp Solutions</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Performing</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">Enterprise software solutions</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Revenue:</span>
              <span className="text-sm font-medium">$24.8M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">EBITDA:</span>
              <span className="text-sm font-medium">$6.2M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Deals:</span>
              <span className="text-sm font-medium">3 active</span>
            </div>
          </div>
          <Link 
            href="/portfolio/1" 
            className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded text-center block hover:bg-blue-100"
          >
            View Details
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Manufacturing Plus</h3>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Watch List</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">Industrial manufacturing</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Revenue:</span>
              <span className="text-sm font-medium">$18.3M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">EBITDA:</span>
              <span className="text-sm font-medium">$3.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Deals:</span>
              <span className="text-sm font-medium">2 active</span>
            </div>
          </div>
          <Link 
            href="/portfolio/2" 
            className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded text-center block hover:bg-blue-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}