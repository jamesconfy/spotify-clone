import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line import/no-cycle
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data: relatedSongsData, isFetching: isFetchingRelatedSonds, error } = useGetSongsRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, relatedSongsData, i }));
    dispatch(playPause(true));
  };

  if (isFetchingRelatedSonds || isFetchingSongDetails) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => <p className="text-gray-400 text-base my-1">{line}</p>)
          ) : (
            <p className="text-gray-400 text-base my-1 ">None</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
