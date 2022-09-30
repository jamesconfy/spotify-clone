import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-2xl text-white">Related Songs:</h1>

    <div className="w-full mt-6 flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
