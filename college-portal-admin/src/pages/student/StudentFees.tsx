import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCollegeData } from '../../context/CollegeDataContext';
import { FeeTransaction } from '../../types';
import { generateFeeReceiptPDF } from '../../utils/pdfGenerator';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  ShieldCheck,
  Building,
  QrCode,
  X
} from 'lucide-react';

export const StudentFees: React.FC = () => {
  const { currentUser } = useAuth();
  const { students, feeTransactions, payFee } = useCollegeData();

  const currentStudent =
    students.find((s) => s.studentId === currentUser?.studentId) || students[0];

  const [activePayModal, setActivePayModal] = useState<FeeTransaction | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePayModal) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const receiptId = payFee(
        activePayModal.id,
        paymentMethod === 'card' ? 'Online Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI Instant Pay' : 'Net Banking'
      );
      setActivePayModal(null);

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleDownloadReceipt = (fee: FeeTransaction) => {
    generateFeeReceiptPDF(currentStudent, fee);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase font-mono">Bursar & Finance Office</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Tuition Fees & Electronic Receipts
          </h1>
          <p className="text-xs text-slate-400">View semester invoice breakdowns, make encrypted payments, and download certified tax receipts.</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">256-Bit Encrypted Gateway</span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-6">
        {feeTransactions.map((fee) => {
          const isPaid = fee.status === 'paid';
          return (
            <div
              key={fee.id}
              className={`glass-panel p-6 rounded-3xl border transition-all space-y-6 ${
                isPaid ? 'border-slate-800' : 'border-indigo-500/50 ring-1 ring-indigo-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{fee.invoiceNumber}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isPaid
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading mt-1">{fee.title}</h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-white font-heading">${fee.amount.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 block">
                    {isPaid ? `Paid on ${fee.paidDate}` : `Due by ${fee.dueDate}`}
                  </span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Tuition & Teaching:</span>
                  <span className="font-bold text-white">${fee.breakdown.tuition.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Lab & Cloud Infra:</span>
                  <span className="font-bold text-white">${fee.breakdown.labExam.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Digital Library:</span>
                  <span className="font-bold text-white">${fee.breakdown.library.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Sports & Amenities:</span>
                  <span className="font-bold text-white">${fee.breakdown.sportsClub.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400">
                  {isPaid ? (
                    <span>Receipt Code: <strong className="text-indigo-400 font-mono">{fee.receiptId}</strong></span>
                  ) : (
                    <span className="text-amber-400 font-medium">⚠️ Please clear dues prior to semester course registration.</span>
                  )}
                </div>

                {isPaid ? (
                  <button
                    onClick={() => handleDownloadReceipt(fee)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" /> Download PDF Receipt
                  </button>
                ) : (
                  <button
                    onClick={() => setActivePayModal(fee)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" /> Proceed to Instant Payment
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Gateway Modal */}
      {activePayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-heading">Apex Secure Checkout</h3>
                <p className="text-xs text-slate-400">{activePayModal.title}</p>
              </div>
              <button
                onClick={() => setActivePayModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Total Payable Amount:</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                ${activePayModal.amount.toLocaleString()}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                Cards
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                NetBanking
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-4 text-xs">
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4532 •••• •••• 8901"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-slate-900" />
                  </div>
                  <p className="text-slate-400 text-[11px]">Scan with Google Pay, PhonePe, or Apple Pay</p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-slate-400 mb-1">Select Bank</label>
                  <select className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white">
                    <option>Chase Bank</option>
                    <option>Bank of America</option>
                    <option>Wells Fargo</option>
                    <option>Citibank</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Encrypted Transaction...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Authorize & Pay ${activePayModal.amount.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
