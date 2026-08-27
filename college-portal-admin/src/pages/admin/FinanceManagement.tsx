import React from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Users
} from 'lucide-react';

export const FinanceManagement: React.FC = () => {
  const { feeTransactions, students } = useCollegeData();

  const totalCollected = feeTransactions
    .filter((f) => f.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = feeTransactions
    .filter((f) => f.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Bursar & Revenue Analytics</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Institutional Fee & Tuition Ledger
          </h1>
          <p className="text-xs text-slate-400">Track semester revenue, student payments, outstanding balances, and electronic transaction receipts.</p>
        </div>

        <button
          onClick={() => alert('Exporting complete finance revenue ledger CSV...')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Financial Report (CSV)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Revenue Realized</span>
          <div className="text-3xl font-black text-white font-heading">${totalCollected.toLocaleString()}</div>
          <p className="text-xs text-emerald-400 font-semibold">Verified Bank Settlements</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-amber-500/30 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Pending Invoices / Dues</span>
          <div className="text-3xl font-black text-white font-heading">${totalPending.toLocaleString()}</div>
          <p className="text-xs text-amber-400 font-semibold">Upcoming Semester Invoices</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Student Tuition</span>
          <div className="text-3xl font-black text-white font-heading">$185,000 / yr</div>
          <p className="text-xs text-indigo-400 font-semibold">Includes Lab & Library Subsidies</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Recent Student Fee Transactions</h3>
          <span className="text-xs text-slate-400">Live Gateway Feeds</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Invoice No</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Semester</th>
                <th className="p-4 text-center">Amount</th>
                <th className="p-4 text-center">Payment Method</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Receipt ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {feeTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-400">{tx.invoiceNumber}</td>
                  <td className="p-4 font-semibold text-white">{tx.title}</td>
                  <td className="p-4 text-center font-mono">Sem {tx.semester}</td>
                  <td className="p-4 text-center font-mono font-black text-white">${tx.amount.toLocaleString()}</td>
                  <td className="p-4 text-center text-slate-400">{tx.paymentMethod || '—'}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        tx.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-indigo-300">{tx.receiptId || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
