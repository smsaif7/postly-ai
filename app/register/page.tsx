'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        router.push('/login'); // সফল হলে লগইন পেজে রিডাইরেক্ট করবে
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#030712', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '380px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Create Account</h2>
        
        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>{error}</p>}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#9ca3af' }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="John Doe"
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#9ca3af' }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="user@example.com"
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#9ca3af' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••"
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
          Sign Up
        </button>

        <p style={{ marginTop: '15px', fontSize: '13px', textAlign: 'center', color: '#9ca3af' }}>
          Already have an account? <Link href="/login" style={{ color: '#60a5fa', textDecoration: 'none' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}