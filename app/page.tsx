'use client';

import { useState } from 'react';

interface GeneratedPosts {
  twitter: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  pinterest: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<GeneratedPosts | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setLoading(true);
    setPosts(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
      } else {
        alert('কন্টেন্ট জেনারেট করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      console.error(err);
      alert('নেটওয়ার্ক ত্রুটি ঘটেছে।');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between selection:bg-blue-600 selection:text-white">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header / Navbar */}
      <nav className="w-full max-w-7xl flex justify-between items-center px-6 md:px-12 py-6 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="flex items-center space-x-3.5">
          {/* Logo Section */}
          <div className="flex items-center h-10 w-auto overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Postly.ai Logo" 
              className="h-full w-auto object-contain" 
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">Postly.ai</span>';
                }
              }} 
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-800 mx-1 hidden sm:block" />
          <span className="text-xs text-blue-400 font-semibold tracking-widest uppercase hidden sm:inline">
            Global Repurposer AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 font-medium hidden md:inline-block shadow-inner">
            ✨ Pro v2.4 Active
          </span>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="max-w-5xl w-full text-center space-y-8 px-6 my-16 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/60 border border-blue-800/60 text-blue-400 rounded-full text-xs font-semibold tracking-wide uppercase shadow-lg shadow-blue-950/50">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Powered by Next-Gen Multi-Platform AI
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
          Turn Any Content Into <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
            Viral Social Mastery
          </span> Instantly.
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          Stop writing from scratch. Postly.ai transforms your long videos and articles into high-converting, engaging deep-dive posts for every major platform in seconds.
        </p>

        {/* Input Box Form */}
        <form onSubmit={handleGenerate} className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">🔗</span>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube Link or Blog URL here..." 
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-all shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[160px]"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI Processing...
              </span>
            ) : "✨ Generate Posts"}
          </button>
        </form>

        {/* Generated Output Preview Section */}
        {posts && (
          <div className="mt-16 text-left space-y-8 animate-fadeIn">
            <div className="border-t border-slate-800/80 pt-12">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent flex items-center gap-2">
                  ✨ High-Converting Content Suite Ready
                </h3>
                <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg">
                  Optimized for Maximum Reach & Engagement
                </span>
              </div>
              
              {/* Grid layout with real copy functionality */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {/* 1. Twitter Thread */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-blue-400 font-bold">🐦 Twitter Thread</span>
                      <span className="bg-blue-950 text-blue-300 px-2.5 py-1 rounded-full text-[10px]">5-Part Viral Thread</span>
                    </div>
                    <div className="text-slate-300 text-sm leading-relaxed space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                      <p>{posts.twitter}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(posts.twitter, 'twitter')} 
                    className="w-full mt-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/30 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {copiedField === 'twitter' ? '✅ Copied to Clipboard!' : '📋 Copy Complete Thread'}
                  </button>
                </div>

                {/* 2. LinkedIn Post */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-indigo-400 font-bold">💼 LinkedIn Post</span>
                      <span className="bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full text-[10px]">Thought Leader</span>
                    </div>
                    <div className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                      <p>{posts.linkedin}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(posts.linkedin, 'linkedin')} 
                    className="w-full mt-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {copiedField === 'linkedin' ? '✅ Copied to Clipboard!' : '📋 Copy Professional Post'}
                  </button>
                </div>

                {/* 3. Instagram Caption */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-pink-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-pink-400 font-bold">📸 Instagram Caption</span>
                      <span className="bg-pink-950 text-pink-300 px-2.5 py-1 rounded-full text-[10px]">High Engagement</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                      {posts.instagram}
                    </p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(posts.instagram, 'instagram')} 
                    className="w-full mt-3 bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 border border-pink-600/30 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {copiedField === 'instagram' ? '✅ Copied to Clipboard!' : '📋 Copy Caption & Hashtags'}
                  </button>
                </div>

                {/* 4. Facebook Post */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-blue-300 font-bold">📘 Facebook Community</span>
                      <span className="bg-blue-950 text-blue-200 px-2.5 py-1 rounded-full text-[10px]">Community Hook</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                      {posts.facebook}
                    </p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(posts.facebook, 'facebook')} 
                    className="w-full mt-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {copiedField === 'facebook' ? '✅ Copied to Clipboard!' : '📋 Copy Community Post'}
                  </button>
                </div>

                {/* 5. Pinterest Pin Description */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-red-500/50 transition-all flex flex-col justify-between shadow-xl md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-red-400 font-bold">📌 Pinterest Pin</span>
                      <span className="bg-red-950 text-red-300 px-2.5 py-1 rounded-full text-[10px]">Visual & SEO</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                      {posts.pinterest}
                    </p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(posts.pinterest, 'pinterest')} 
                    className="w-full mt-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {copiedField === 'pinterest' ? '✅ Copied to Clipboard!' : '📋 Copy Pin Description'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-8 border-t border-slate-900 text-slate-500 text-xs mt-20 bg-slate-950/50">
        <p>© 2026 Postly.ai — Empowering creators worldwide to scale faster. All rights reserved.</p>
      </footer>
    </main>
  );
}