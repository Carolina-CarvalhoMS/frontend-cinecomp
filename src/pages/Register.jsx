import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, User, Mail, Lock } from 'lucide-react';
import { api } from '../services/api';
import { Header } from '../components/Header';

export function Register() {
  const [name, setName] = useState('');
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
      await api.post('/auth/register', { name, email, password });
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(
        err.response?.data?.message ||
          'Não foi possível realizar o cadastro. Tente novamente.'
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
            Criar Conta no CineComp
          </h2>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Preencha os dados abaixo para se cadastrar
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
                <User size={14} /> Nome Completo
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
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
                placeholder="Crie uma senha"
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
              <UserPlus size={18} />
              {loading ? 'A cadastrar...' : 'Cadastrar'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Já tem uma conta? </span>
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>
              Entrar
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}