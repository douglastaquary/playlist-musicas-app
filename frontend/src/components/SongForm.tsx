import { useState } from 'react';

interface SongFormProps {
  onSubmit: (name: string, artist?: string) => void;
}

export const SongForm: React.FC<SongFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), artist.trim() || undefined);
      setName('');
      setArtist('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
          Nome da Música *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Digite o nome da música"
        />
      </div>

      <div>
        <label htmlFor="artist" className="block text-lg font-semibold text-gray-700 mb-2">
          Artista (opcional)
        </label>
        <input
          id="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Digite o nome do artista"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
      >
        ➕ Adicionar Música
      </button>
    </form>
  );
};

