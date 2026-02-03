import React, { useState } from 'react';
import { Check, Loader2, DollarSign, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface ApprovalCardProps {
  applicationId: string;
  amount?: string; // Optional prop untuk display harga
}

const ProjectApprovalCard: React.FC<ApprovalCardProps> = ({
  applicationId = "99999999-9999-9999-9999-999999999999", // Default ID untuk testing
  amount = "Rp 1.500.000" // Default dummy amount
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReleasePayout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // URL EDGE FUNCTION GIGGO (Sesuai Request)
      const response = await fetch('https://ezsite.ai/project/42735/functions/v1/release-payout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Jika Ezsite butuh Auth anon key, biasanya disisipkan di sini.
          // 'Authorization': 'Bearer YOUR_ANON_KEY' 
        },
        body: JSON.stringify({ application_id: applicationId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal memproses pembayaran.');
      }

      // Sukses
      setIsSuccess(true);
      console.log('Payout Success:', data);

    } catch (err: any) {
      console.error('Payout Error:', err);
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md p-6 rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-md flex flex-col items-center justify-center space-y-3 animate-in fade-in zoom-in duration-300">
        <div className="p-3 bg-green-500/20 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Payment Released!</h3>
        <p className="text-zinc-400 text-sm text-center">Dana telah diteruskan ke dompet Creator.</p>
      </div>);

  }

  return (
    <div className="w-full max-w-md p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
      {/* Decorative Gradient Line at Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Project Approval
          </h3>
          <p className="text-zinc-500 text-xs mt-1">Review submission & release escrow.</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 flex items-center gap-1">
          <DollarSign className="w-3 h-3 text-zinc-400" />
          <span className="text-sm font-mono text-zinc-300">{amount}</span>
        </div>
      </div>

      {error &&
      <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-sm text-red-400">{error}</div>
        </div>
      }

      <div className="space-y-3">
        {/* PRIMARY BUTTON: RELEASE PAYOUT */}
        <button
          onClick={handleReleasePayout}
          disabled={isLoading}
          className="relative w-full group/btn overflow-hidden rounded-lg bg-emerald-500 p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

          <div className="relative w-full h-full bg-black/50 rounded-lg px-4 py-3 flex items-center justify-center transition-colors group-hover/btn:bg-transparent">
             {/* Neon Glow Effect */}
             <div className="absolute inset-0 bg-emerald-600/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />
             
             {isLoading ?
            <Loader2 className="w-5 h-5 text-white animate-spin" /> :

            <span className="relative font-bold text-white flex items-center gap-2">
                 ✅ Approve & Release Funds
               </span>
            }
          </div>
        </button>

        {/* SECONDARY BUTTON: REVISION */}
        <button
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-sm font-medium flex items-center justify-center gap-2">

          <X className="w-4 h-4" />
          Request Revision
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
         <span className="text-[10px] uppercase tracking-widest text-zinc-600">Secure Escrow Connection</span>
      </div>
    </div>);

};

export default ProjectApprovalCard;