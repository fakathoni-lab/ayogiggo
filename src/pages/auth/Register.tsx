import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Phone, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'brand' as 'brand' | 'creator'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Register with EZsite Auth
      const { error: authError } = await window.ezsite.apis.register({
        email: formData.email,
        password: formData.password
      });

      if (authError) {
        toast.error(authError);
        setIsLoading(false);
        return;
      }

      // Step 2: Create user profile in database
      const { error: dbError } = await window.ezsite.apis.insertToTable({
        tableName: 'users',
        records: [{
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          phone: formData.phone,
          password_hash: 'managed_by_ezsite' // Placeholder, actual hash managed by EZsite
        }]
      });

      if (dbError) {
        console.error('Failed to create user profile:', dbError);
        // Continue anyway - auth is created
      }

      // Step 3: If creator, create profile entry
      if (formData.role === 'creator') {
        await window.ezsite.apis.insertToTable({
          tableName: 'creator_profiles',
          records: [{
            user_id: formData.email, // Using email as identifier until we get actual ID
            portfolio_urls: '[]',
            tiktok_handle: '',
            instagram_handle: '',
            is_verified: false,
            total_earnings: 0
          }]
        });
      }

      // Show success screen
      setShowSuccess(true);

      // Countdown and redirect
      let count = 5;
      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        if (count === 0) {
          clearInterval(timer);
          window.location.href = '/login';
        }
      }, 1000);

    } catch (err) {
      console.error('Registration error:', err);
      toast.error('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full text-center">

          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-slate-300 mb-6">
            Please check your email (including spam/junk folder) and click the activation link to activate your account before logging in.
          </p>
          <div className="text-cyan-400 font-semibold">
            Redirecting to login in {countdown} seconds...
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Join Giggo
          </h1>
          <p className="text-slate-400">Create your account and start collaborating</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Toggle */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'brand' })}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              formData.role === 'brand' ?
              'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' :
              'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`
              }>

              Brand
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'creator' })}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              formData.role === 'creator' ?
              'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' :
              'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`
              }>

              Creator
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="John Doe"
                required />

            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="john@example.com"
                required />

            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-12 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Min. 8 characters"
                minLength={8}
                required />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">

                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="+62 812 3456 7890" />

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">

            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>);

}