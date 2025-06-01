import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Giriş başarılı!");
        console.log(data);
        // Yönlendirme:
        navigate('/profile'); // Örn: profil sayfası
      } else {
        alert("❌ Hata: " + data.error);
      }
    } catch (err) {
      console.error("Login hatası:", err);
      alert("❌ Giriş sırasında bir hata oluştu.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#fff',
        padding: '2rem 2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Giriş Yap</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Şifre"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={{
          padding: '0.8rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Giriş Yap
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Hesabınız yok mu? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/register')}>Kayıt ol</span>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
  outline: 'none',
  width: '100%'
};

export default LoginPage;
