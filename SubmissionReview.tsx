import React from 'react';
import { ArrowLeft, Play, MessageSquare, Download, Share2 } from 'lucide-react';
// Import komponen Approval Card yang baru saja Anda buat
// Pastikan path-nya sesuai dengan struktur folder Anda
import ProjectApprovalCard from './ProjectApprovalCard';

const SubmissionReview = () => {
  // Data Dummy untuk Preview (Nanti diganti data real dari DB)
  const submissionData = {
    campaignTitle: "Review TWS Gaming Low Latency",
    creatorName: "Budi Vlog",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-1238-large.mp4", // Dummy Video
    notes: "Halo Brand, ini draft pertama saya. Menit 0:30 saya highlight fitur delay-nya. Mohon feedback!",
    submissionDate: "4 Feb 2026",
    applicationId: "99999999-9999-9999-9999-999999999999" // ID Dummy yang sama dengan tes tadi
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      
      {/* HEADER NAV */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
             <span className="text-zinc-500 text-xs uppercase tracking-widest">Review Mode</span>
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Live" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: VIDEO PLAYER & NOTES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
             {/* Overlay Play Button (Estetika) */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                   <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
             </div>
             {/* Dummy Video Tag */}
             <video 
               src={submissionData.videoUrl} 
               className="w-full h-full object-cover" 
               controls 
               poster="https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&w=800&q=80"
             />
          </div>

          {/* Metadata & Actions */}
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-2xl font-bold text-white mb-1">{submissionData.campaignTitle}</h1>
                <p className="text-zinc-400 text-sm flex items-center gap-2">
                   Created by <span className="text-white font-medium">{submissionData.creatorName}</span>
                   <span className="text-zinc-600">•</span>
                   {submissionData.submissionDate}
                </p>
             </div>
             <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 transition-colors">
                   <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 transition-colors">
                   <Share2 className="w-4 h-4" />
                </button>
             </div>
          </div>

          {/* Creator Notes */}
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50">
             <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Creator Notes
             </h3>
             <p className="text-zinc-400 text-sm leading-relaxed">
                "{submissionData.notes}"
             </p>
          </div>

        </div>

        {/* KOLOM KANAN: APPROVAL CARD (ACTION CENTER) */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 space-y-6">
              
              {/* STATUS INDICATOR */}
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-medium flex items-center gap-3">
                 <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                 Pending Review
              </div>

              {/* KOMPONEN UTAMA KITA */}
              <ProjectApprovalCard 
                 applicationId={submissionData.applicationId}
                 amount="Rp 750.000"
              />

              {/* Safety Notice */}
              <p className="text-xs text-zinc-600 text-center px-4">
                 By clicking Approve, funds will be released from Escrow immediately. This action cannot be undone.
              </p>

           </div>
        </div>

      </main>
    </div>
  );
};

export default SubmissionReview;