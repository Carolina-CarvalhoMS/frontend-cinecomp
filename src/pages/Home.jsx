import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Film } from 'lucide-react';
import { api } from '../services/api';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { signed } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function fetchMovies() {
    try {
      setLoading(true);
      const response = await api.get('/movies');
      const data = response.data.data || response.data;
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Erro ao carregar o catálogo de filmes.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  async function handleCreateMovie(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await api.post('/movies', {
        title: title.trim(),
        director: director.trim(),
        genre: genre.trim(),
        releaseYear: Number(releaseYear),
        rating: Number(rating.toString().replace(',', '.')),
        description: description.trim() || undefined,
      });

      setFeedback({ type: 'success', message: 'Filme cadastrado com sucesso!' });
      setTitle('');
      setDirector('');
      setGenre('');
      setReleaseYear('');
      setRating('');
      setDescription('');
      fetchMovies();
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao cadastrar filme.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Header />

      {signed && (
        <section className="card-container" style={{ marginBottom: '32px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Plus size={20} /> Cadastrar Novo Filme
          </h2>

          {feedback.message && (
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '16px',
                backgroundColor: feedback.type === 'success' ? '#dcfce7' : '#fee2e2',
                color: feedback.type === 'success' ? '#166534' : '#991b1b',
                fontSize: '0.9rem',
              }}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleCreateMovie} style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <label>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Título</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </label>

              <label>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Diretor</span>
                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} required />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              <label>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Gênero</span>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
              </label>

              <label>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Ano</span>
                <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
              </label>

              <label>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Nota</span>
                <input type="number" step="0.1" min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)} required />
              </label>
            </div>

            <label>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Sinopse</span>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ justifySelf: 'start' }}>
              {submitting ? 'A cadastrar...' : 'Cadastrar Filme'}
            </button>
          </form>
        </section>
      )}

      <section>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Film size={22} /> Catálogo de Filmes
        </h2>

        {loading && <p style={{ textAlign: 'center', padding: '20px' }}>A carregar catálogo...</p>}
        {error && <p style={{ color: 'var(--danger)', textAlign: 'center', padding: '20px' }}>{error}</p>}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {movies.map((movie) => (
              <article key={movie.id} className="card-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="badge-group" style={{ marginBottom: '8px' }}>
                    <span className="badge badge-genre">{movie.genre}</span>
                    <span className="badge badge-rating" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#b45309" color="#b45309" /> {movie.rating}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{movie.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {movie.releaseYear} | {movie.director}
                  </p>
                </div>

                <Link to={`/movies/${movie.id}`} className="btn btn-outline" style={{ textAlign: 'center', marginTop: '12px' }}>
                  Ver Detalhes
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}