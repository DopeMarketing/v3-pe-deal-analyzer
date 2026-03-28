import { createSupabaseServer } from '@/lib/supabase'
import Link from 'next/link'

export default async function DealsPage() {
  const supabase = await createSupabaseServer()
  
  // TODO: Fetch all deals with portfolio company info and deal scores
  // TODO: Load performance metrics for each deal
  // TODO: Get filtering options from deals table columns

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Deal Management</h1>
        <div className="flex space-x-3">
          <Link 
            href="/deals/compare" 
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Compare Deals
          </Link>
          <Link 
            href="/deals/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            New Deal
          </Link>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Stage</label>
              <select className="w-full border rounded px-3 py-2">
                <option>All Stages</option>
                <option>Due Diligence</option>
                <option>Closed</option>
                <option>Exited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Investment Size</label>
              <select className="w-full border rounded px-3 py-2">
                <option>All Sizes</option>
                <option>$0-5M</option>
                <option>$5-20M</option>
                <option>$20M+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deal Table */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IRR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MOIC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">TechCorp Solutions</div>
                      <div className="text-sm text-gray-500">Software</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$15.2M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">22.4%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">3.2x</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href="/deals/1" className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                    <Link href="/deals/1/edit" className="text-gray-600 hover:text-gray-900">Edit</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}