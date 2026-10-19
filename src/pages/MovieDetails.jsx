import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Header } from '../components/Header';

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('@CineComp:token');

  async function loadMovie() {
    try {
      setLoading(true);
      const response = await api.get(`/movies/${id}`);
      const data = response.data.data || response.data;

      setMovie(data);
      setTitle(data.title || '');
      setDirector(data.director || '');
      setGenre(data.genre || '');
      setReleaseYear(data.releaseYear || '');
      setRating(data.rating || '');
      setDescription(data.description || '');
    } catch (err) {
      setError('Filme não encontrado.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMovie(); }, [id]);

  async function handleDelete() {
    if (window.confirm(`Deseja mesmo eliminar o filme "${movie.title}"?`)) {
      try {
        await api.delete(`/movies/${id}`);
        alert('Filme removido!');
        navigate('/');
      } catch (err) {
        alert('Erro ao excluir filme.');
      }
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/movies/${id}`, {
        title: title.trim(),
        director: director.trim(),
        genre: genre.trim(),
        releaseYear: Number(releaseYear),
        rating: Number(rating.toString().replace(',', '.')),
        description: description.trim() || undefined,
      });
      alert('Filme atualizado com sucesso!');
      setIsEditing(false);
      loadMovie();
    } catch (err) {
      alert('Falha ao atualizar o filme.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>A carregar detalhes...</div>;
  if (error) return <div style={{ padding: '40px', color: 'var(--danger)' }}>{error}</div>;
  if (!movie) return null;

  return (
    <div>
      <Header />

      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--primary)', fontWeight: '600' }}>
        ← Voltar para o Catálogo
      </Link>

      {!isEditing ? (
        <article className="card-container">
          <div className="badge-group" style={{ marginBottom: '12px' }}>
            <span className="badge badge-genre">{movie.genre}</span>
            <span className="badge badge-rating">★ {movie.rating} / 10</span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>{movie.title}</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Lançamento: <strong>{movie.releaseYear}</strong> | Direção: <strong>{movie.director || 'Não informada'}</strong>
          </p>

          <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px' }}>SINOPSE</h4>
            <p>{movie.description || 'Sem sinopse cadastrada para este filme.'}</p>
          </div>

          {token && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setIsEditing(true)} className="btn btn-warning">✏️ Editar Filme</button>
              <button onClick={handleDelete} className="btn btn-danger">🗑️ Eliminar Filme</button>
            </div>
          )}
        </article>
      ) : (
        <section className="card-container">
          <h2 style={{ marginBottom: '20px' }}>Editar Filme</h2>
          <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '14px' }}>
            <label>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Título</span>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Diretor</span>
              <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} required />
            </label>

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
              <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="submit" disabled={saving} className="btn btn-success">{saving ? 'A guardar...' : 'Salvar Alterações'}</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">Cancelar</button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}