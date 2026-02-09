import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function OnAuthSuccess() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Registration Verified!</h2>
        <p className="text-slate-300 mb-8">
          Your account has been successfully activated.
        </p>

        <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 mb-6">
          <p className="text-slate-400 mb-2">Redirecting to login page in</p>
          <motion.div
            key={countdown}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {countdown}
          </motion.div>
        </div>

        <button
          onClick={() => window.location.href = '/login'}
          className="text-cyan-400 hover:text-cyan-300 font-medium underline"
        >
          Go to login now
        </button>
      </motion.div>
    </div>
  );
}
