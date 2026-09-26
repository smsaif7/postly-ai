'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Real AI API call handle korar function
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setGeneratedContent(null);

    try {
      const res = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedContent(data.data);
      } else {
        alert('Failed to generate content. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#fff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Postly.ai Dashboard</h1>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '5px 0 0' }}>Welcome back, {session?.user?.name || session?.user?.email || 'User'}!</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            Logout
          </button>
        </div>

        {/* Repurpose Card */}
        <div style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>✨ AI Content Repurposer</h2>
          
          <form onSubmit={handleGenerate}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#9ca3af' }}>Paste your blog, article, or raw text here:</label>
              <textarea 
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your long-form content here to turn it into engaging social posts..."
                required
                style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#030712', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '14px', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#3b82f6' : '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
            >
              {loading ? 'Generating AI Posts...' : 'Repurpose Content 🚀'}
            </button>
          </form>

          {/* Generated Results Area */}
          {generatedContent && (
            <div style={{ marginTop: '30px', borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#60a5fa' }}>Generated Multi-Platform Results:</h3>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                
                {/* Twitter */}
                <div style={{ background: '#030712', padding: '15px', borderRadius: '8px', border: '1px solid #374151', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#38bdf8', margin: 0 }}>🐦 Twitter / X Thread</h4>
                    <button 
                      onClick={() => handleCopy(generatedContent.twitter, 'twitter')}
                      style={{ padding: '4px 10px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      {copiedField === 'twitter' ? 'Copied! ✅' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', margin: 0, color: '#e5e7eb' }}>{generatedContent.twitter}</p>
                </div>

                {/* LinkedIn */}
                <div style={{ background: '#030712', padding: '15px', borderRadius: '8px', border: '1px solid #374151', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#38bdf8', margin: 0 }}>💼 LinkedIn Post</h4>
                    <button 
                      onClick={() => handleCopy(generatedContent.linkedin, 'linkedin')}
                      style={{ padding: '4px 10px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      {copiedField === 'linkedin' ? 'Copied! ✅' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', margin: 0, color: '#e5e7eb' }}>{generatedContent.linkedin}</p>
                </div>

                {/* Facebook */}
                <div style={{ background: '#030712', padding: '15px', borderRadius: '8px', border: '1px solid #374151', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#38bdf8', margin: 0 }}>📘 Facebook Caption</h4>
                    <button 
                      onClick(() => handleCopy(generatedContent.facebook, 'facebook')}
                      style={{ padding: '4px 10px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      {copiedField === 'facebook' ? 'Copied! ✅' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', margin: 0, color: '#e5e7eb' }}>{generatedContent.facebook}</p>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}