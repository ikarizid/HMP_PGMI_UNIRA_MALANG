import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { authStore } from '../utils/storage';
import './AdminLogin.css';
import logoUrl from '../assets/logo.png';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (authStore.login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="admin-login" id="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo" style={{ background: 'transparent', boxShadow: 'none' }}>
          <img src={logoUrl} alt="Logo HMP PGMI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h1>Admin Panel</h1>
        <p>HMP PGMI UNIRA MALANG — Area Pengurus</p>

        {error && <div className="admin-login__error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <User size={18} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              id="admin-username"
            />
          </div>
          <div className="admin-input-group">
            <Lock size={18} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="admin-password"
            />
            <button type="button" className="admin-input-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
