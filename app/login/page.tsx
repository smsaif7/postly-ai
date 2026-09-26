'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Login failed! Please check your email or password.');
    } else {
      router.push('/'); // Redirect to homepage on successful login
      router.refresh();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#090d16', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '380px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Welcome Back</h2>
        
        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>{error}</p>}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#9ca3af' }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="admin@example.com"
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
            placeholder="123456"
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
          Sign In
        </button>
        
        <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '6px', border: '1px solid rgba(37, 99, 235, 0.2)', fontSize: '12px', textAlign: 'center', color: '#93c5fd' }}>
          <b>Test Credentials:</b><br />
          Email: admin@example.com<br />
          Password: 123456
        </div>
      </form>
    </div>
  );
}