import { useNavigate } from 'react-router-dom';

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>First Page</h1>
      <button onClick={() => navigate('/register')}>Kayıt Ol</button>
    </div>
  );
}

export default FirstPage;
