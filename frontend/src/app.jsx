import React, { useState, useEffect } from 'react';
import { Heart, X, Star, MapPin, Camera, MessageCircle, Eye, EyeOff, Lock, User } from 'lucide-react';

const DatingApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ana uygulama state'leri
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [matches, setMatches] = useState(0);
  const [likes, setLikes] = useState(0);

  // Örnek kullanıcı verileri
  const profiles = [
    {
      id: 1,
      name: "Elif",
      age: 25,
      location: "İstanbul",
      bio: "Yoga seviyorum, kahve bağımlısıyım ☕ Seyahat etmeyi ve yeni yerler keşfetmeyi çok seviyorum.",
      photos: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop"],
      interests: ["Yoga", "Kahve", "Seyahat", "Fotoğraf"]
    },
    {
      id: 2,
      name: "Mehmet",
      age: 28,
      location: "Ankara",
      bio: "Müzik prodüktörü, gitarist 🎸 Doğa yürüyüşleri ve camping seviyorum.",
      photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"],
      interests: ["Müzik", "Doğa", "Gitar", "Camping"]
    },
    {
      id: 3,
      name: "Zeynep",
      age: 24,
      location: "İzmir",
      bio: "Ressam ve sanat öğretmeni 🎨 Kitap okumayı ve müze gezmeyi seviyorum.",
      photos: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"],
      interests: ["Resim", "Kitap", "Sanat", "Müze"]
    },
    {
      id: 4,
      name: "Can",
      age: 30,
      location: "Antalya",
      bio: "Yazılım geliştirici ve gamer 💻 Plaj voleybolu oynuyorum, deniz sevgisi var.",
      photos: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"],
      interests: ["Yazılım", "Oyun", "Voleybol", "Deniz"]
    },
    {
      id: 5,
      name: "Ayşe",
      age: 26,
      location: "Bursa",
      bio: "Mutfak şefi ve yemek bloggerı 👩‍🍳 Yeni tarifler denemeyi ve arkadaşlarıma yemek yapmayı seviyorum.",
      photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"],
      interests: ["Yemek", "Blog", "Tarif", "Şef"]
    }
  ];

  const currentProfile = profiles[currentIndex];

  // Floating hearts animation
  const FloatingHeart = ({ delay = 0, size = 'w-4 h-4' }) => (
    <div 
      className={`absolute text-pink-300 opacity-60 animate-bounce ${size}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      <Heart className="fill-current" />
    </div>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      if (loginData.username && loginData.password) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    if (direction === 'right') {
      setLikes(prev => prev + 1);
      // %30 şansla match olsun
      if (Math.random() < 0.3) {
        setMatches(prev => prev + 1);
        setTimeout(() => {
          alert(`🎉 ${currentProfile.name} ile eşleştiniz!`);
        }, 500);
      }
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % profiles.length);
      setIsAnimating(false);
      setSwipeDirection('');
    }, 300);
  };

  const resetProfiles = () => {
    setCurrentIndex(0);
    setMatches(0);
    setLikes(0);
  };

  // Giriş ekranı
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-600 relative overflow-hidden">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <FloatingHeart key={i} delay={i * 0.3} size={i % 3 === 0 ? 'w-6 h-6' : 'w-4 h-4'} />
          ))}
        </div>

        {/* Decorative Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-16 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 bg-purple-300/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-red-300/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            {/* Logo ve Başlık */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="bg-white/20 backdrop-blur-lg rounded-full p-6 mb-4 shadow-2xl">
                  <Heart className="w-16 h-16 text-white fill-current mx-auto animate-pulse" />
                </div>
                {/* Mini hearts around logo */}
                <Heart className="absolute -top-2 -right-2 w-6 h-6 text-pink-200 fill-current animate-bounce" />
                <Heart className="absolute -bottom-2 -left-2 w-4 h-4 text-red-200 fill-current animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">AşkKompass</h1>
              <p className="text-white/80 text-lg">Gerçek aşkı bul ❤️</p>
            </div>

            {/* Giriş Formu */}
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Kullanıcı Adı */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Şifre */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifre"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full pl-12 pr-12 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Giriş Butonu */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Giriş Yapılıyor...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Heart className="w-5 h-5 mr-2 fill-current" />
                      Giriş Yap
                    </div>
                  )}
                </button>
              </form>

              {/* Alt Kısım */}
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  Hesabın yok mu?{' '}
                  <a href="#" className="text-white hover:underline font-medium">
                    Üye Ol
                  </a>
                </p>
              </div>
            </div>

            {/* Demo Bilgileri */}
            <div className="mt-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-white/80 text-sm mb-2">💡 Demo için herhangi bir kullanıcı adı ve şifre girebilirsiniz</p>
                <div className="flex justify-center space-x-4 text-xs text-white/60">
                  <span>❤️ Kalp dolu deneyim</span>
                  <span>🎨 Renkli tasarım</span>
                  <span>✨ Sihirli animasyonlar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ana uygulama (giriş yapıldıktan sonra)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-white">AşkKompass</h1>
          </div>
          <div className="flex space-x-4 text-white">
            <div className="text-center">
              <div className="font-bold">{matches}</div>
              <div className="text-xs opacity-80">Eşleşme</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{likes}</div>
              <div className="text-xs opacity-80">Beğeni</div>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="text-xs opacity-80 hover:opacity-100 transition-opacity"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>

      {/* Main Card Area */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="relative">
          {/* Profile Card */}
          <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
            isAnimating ? (swipeDirection === 'left' ? '-translate-x-full rotate-12' : 'translate-x-full rotate-12') : ''
          } ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Photo */}
            <div className="relative h-96 overflow-hidden">
              <img 
                src={currentProfile?.photos[0]} 
                alt={currentProfile?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Name and Age Overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold">{currentProfile?.name}, {currentProfile?.age}</h2>
                <div className="flex items-center mt-1 opacity-90">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{currentProfile?.location}</span>
                </div>
              </div>

              {/* Camera icon */}
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full p-2">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {currentProfile?.bio}
              </p>
              
              {/* Interests */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProfile?.interests.map((interest, index) => (
                  <span key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {interest}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-6 mt-6">
                {/* Dislike Button */}
                <button 
                  onClick={() => handleSwipe('left')}
                  className="bg-white border-2 border-red-200 text-red-500 rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 active:scale-95"
                  disabled={isAnimating}
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Super Like Button */}
                <button 
                  onClick={() => handleSwipe('super')}
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 active:scale-95"
                  disabled={isAnimating}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>

                {/* Like Button */}
                <button 
                  onClick={() => handleSwipe('right')}
                  className="bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 active:scale-95"
                  disabled={isAnimating}
                >
                  <Heart className="w-8 h-8 fill-current" />
                </button>
              </div>

              {/* Instructions */}
              <div className="text-center mt-6 text-gray-500 text-sm">
                <p>← Beğenmedim | ⭐ Süper Beğeni | Beğendim →</p>
              </div>
            </div>
          </div>

          {/* Next Card Preview */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl -z-10 transform scale-95 opacity-50">
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl"></div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button 
            onClick={resetProfiles}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-200"
          >
            Baştan Başla
          </button>
        </div>

        {/* Bottom Navigation Hint */}
        <div className="flex justify-center space-x-8 mt-8 opacity-60">
          <div className="text-white text-center">
            <MessageCircle className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">Sohbet</div>
          </div>
          <div className="text-white text-center">
            <Heart className="w-6 h-6 mx-auto mb-1 fill-current" />
            <div className="text-xs">Beğeniler</div>
          </div>
          <div className="text-white text-center">
            <Star className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">Profil</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatingApp;
