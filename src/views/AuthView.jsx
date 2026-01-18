import { useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // Store the notification

  const authAction = async (type) => {
    setMessage({ text: '', type: '' }); // Clear old messages
    
    let result;
    if (type === 'login') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { data, error } = result;

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else if (type === 'signup' && data.user) {
      // If signup is successful, tell them to check email
      setMessage({ 
        text: 'Check your email for a confirmation link!', 
        type: 'success' 
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center tracking-tight">Workspace</h1>
        
        {/* Notification Box */}
        {message.text && (
          <div className={`p-3 rounded-md text-xs font-medium border ${
            message.type === 'error' 
              ? 'bg-red-50 border-red-200 text-red-600' 
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            onClick={() => authAction('login')} 
            className="w-full bg-accent text-white py-2 rounded-md text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={() => authAction('signup')} 
            className="w-full border border-border py-2 rounded-md text-sm font-medium hover:bg-side-bg cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;