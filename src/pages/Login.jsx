import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token || response.data.data?.token;

      if (token) {
        localStorage.setItem('@CineComp:token', token);
      }

      alert('Login efetuado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setError(
        err.response?.data?.message ||
        'E-mail ou senha inválidos'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Entrar no CineComp</h2>

      {error && <p style={{ color: 'red', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Sua senha"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {loading ? 'A autenticar...' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <p style={{ marginBottom: '8px' }}>
          Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
        <Link to="/">← Voltar ao catálogo</Link>
      </div>
    </div>
  );
}