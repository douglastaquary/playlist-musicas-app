import { Song } from '../pages/PlaylistView';

interface SongListProps {
  songs: Song[];
}

export const SongList: React.FC<SongListProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl md:text-2xl text-gray-600">
          Nenhuma música adicionada ainda. Seja o primeiro a adicionar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="bg-gray-50 hover:bg-gray-100 border-l-4 border-blue-500 p-4 rounded-lg transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl md:text-3xl font-bold text-blue-600 min-w-[40px]">
                  #{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {song.name}
                </h3>
              </div>
              {song.artist && (
                <p className="text-lg md:text-xl text-gray-600 ml-[52px]">
                  🎤 {song.artist}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

