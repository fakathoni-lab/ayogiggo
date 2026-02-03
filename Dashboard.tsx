import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Briefcase, 
  Users, 
  Bell, 
  Search, 
  ArrowUpRight,
  MoreHorizontal,
  PlayCircle,
  Clock
} from 'lucide-react';

// Navigasi Sederhana
const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-400 bg-zinc-800'}`}>
        {trend === 'up' ? '+12.5%' : 'Stable'}
      </span>
    </div>
    <div className="space-y-1">
      <h3 className="text-zinc-400 text-sm">{label}</h3>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-black">G</div>
          <span className="text-xl font-bold tracking-tight">Giggo<span className="text-emerald-500">.</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Overview" active />
          <SidebarItem icon={Briefcase} label="Campaigns" />
          <SidebarItem icon={Users} label="Creators" />
          <SidebarItem icon={Wallet} label="Finance" />
        </nav>

        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <p className="text-xs text-zinc-400 mb-2">Logged in as</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">TV</div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">TechVision ID</p>
              <p className="text-xs text-zinc-500 truncate">Brand Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* TOP BAR */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search..." className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 w-64" />
            </div>
            <button className="relative p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
            </button>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Briefcase} label="Active Campaigns" value="2" trend="up" color="bg-blue-500" />
          <StatCard icon={Users} label="Total Applicants" value="14" trend="up" color="bg-purple-500" />
          <StatCard icon={Wallet} label="Escrow Balance" value="Rp 2.250.000" trend="stable" color="bg-emerald-500" />
          <StatCard icon={PlayCircle} label="Videos Pending" value="1" trend="important" color="bg-orange-500" />
        </div>

        {/* RECENT ACTIVITY & ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Table: Active Jobs */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Recent Applications</h3>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">View All</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/50 text-zinc-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Campaign</th>
                  <th className="px-6 py-4 font-medium">Creator</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {/* Item 1: Pending Review (Yang tadi kita buat) */}
                <tr className="hover:bg-zinc-900/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">Review TWS Gaming</td>
                  <td className="px-6 py-4 text-zinc-300">Budi Vlog</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                      Needs Review
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* Link ke Submission Review */}
                    <button className="text-white hover:text-emerald-400 transition-colors font-medium text-xs flex items-center justify-end gap-1 ml-auto">
                      Review Now <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
                
                {/* Item 2: Logistik */}
                <tr className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Serum Glowing 7 Hari</td>
                  <td className="px-6 py-4 text-zinc-300">Sari Review</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      Shipped
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Side Widget: Quick Actions */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20">
              <h3 className="font-semibold text-white mb-2">Create New Campaign</h3>
              <p className="text-sm text-zinc-400 mb-4">Post a new brief and let our AI match you with creators.</p>
              <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm transition-colors">
                + Post Job
              </button>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800">
              <h3 className="font-semibold text-white mb-4">Activity Log</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                   <div>
                      <p className="text-sm text-zinc-300">Payout Released</p>
                      <p className="text-xs text-zinc-500">To Budi Vlog • Rp 750k</p>
                   </div>
                   <span className="text-xs text-zinc-600 ml-auto">2m</span>
                </div>
                <div className="flex gap-3">
                   <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                   <div>
                      <p className="text-sm text-zinc-300">Package Delivered</p>
                      <p className="text-xs text-zinc-500">Sari Review received item</p>
                   </div>
                   <span className="text-xs text-zinc-600 ml-auto">1h</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;