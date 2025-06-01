import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    bio: '',
    location: '',
    interests: [],
  });

  const navigate = useNavigate();

  const citiesOfTurkey = [];
  const [interestOptions, setInterestOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/interests')
      .then(res => res.json())
      .then(data => setInterestOptions(data))
      .catch(err => console.error("İlgi alanları yüklenemedi:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updatedInterests = checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value);
      return {
        ...prev,
        interests: updatedInterests
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      alert("Lütfen en az bir ilgi alanı seçin.");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      profile: {
        age: Number(formData.age),
        gender: formData.gender,
        bio: formData.bio,
        location: formData.location,
        interests: formData.interests
      }
    };

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Kayıt başarılı!");
        navigate('/login');
      } else {
        alert("❌ Hata: " + result.error);
      }
    } catch (err) {
      console.error("Sunucu hatası:", err);
      alert("❌ Kayıt sırasında bir hata oluştu.");
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
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Kayıt Ol</h2>

        <input name="username" placeholder="Kullanıcı Adı" onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
        <input name="password" type="password" placeholder="Şifre" onChange={handleChange} required style={inputStyle} />
        <input name="age" type="number" placeholder="Yaş" onChange={handleChange} required style={inputStyle} />

        <select name="gender" onChange={handleChange} required style={inputStyle}>
          <option value="">Cinsiyet Seçiniz</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
          <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
        </select>

        <select name="location" value={formData.location} onChange={handleChange} required style={inputStyle}>
          <option value="">Şehir Seçin</option>
          {citiesOfTurkey.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <textarea name="bio" placeholder="Hakkında (opsiyonel)" onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />

        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>İlgi Alanların:</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            background: '#f9f9f9'
          }}>
            {interestOptions.length > 0 ? (
              interestOptions.map((interest) => (
                <label key={interest._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <input type="checkbox" value={interest.name} onChange={handleCheckboxChange} />
                  {interest.name}
                </label>
              ))
            ) : (
              <p>İlgi alanları yükleniyor...</p>
            )}
          </div>
        </div>

        <button type="submit" style={{
          padding: '0.8rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Kayıt Ol
        </button>
        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            Zaten bir hesabınız var mı?{" "}
            <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                Giriş yap
            </span>
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

export default RegisterPage;
