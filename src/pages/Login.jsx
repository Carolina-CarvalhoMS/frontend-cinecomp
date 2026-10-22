import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setError(
        err.response?.data?.message || 'E-mail ou senha inválidos.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />

      <div style={{ maxWidth: '420px', margin: '20px auto 0' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '16px',
            color: 'var(--primary)',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={16} /> Voltar ao catálogo
        </Link>

        <section className="card-container">
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              marginBottom: '6px',
              textAlign: 'center',
            }}
          >
            Entrar no CineComp
          </h2>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Acesse sua conta para gerenciar filmes
          </p>

          {error && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: 'var(--danger)',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.875rem',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <label style={{ display: 'grid', gap: '6px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Mail size={14} /> E-mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </label>

            <label style={{ display: 'grid', gap: '6px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Lock size={14} /> Senha
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
              }}
            >
              <LogIn size={18} />
              {loading ? 'A autenticar...' : 'Entrar'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ainda não tem conta? </span>
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
              Cadastre-se
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}