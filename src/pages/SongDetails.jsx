import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
} from "../redux/services/deezerCore";
import PlayPause from "../components/PlayPause";
import { useEffect } from "react";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongData,
    error,
  } = useGetSongDetailsQuery({
    songid,
  });

  const { data: relatedSongs, isFetching: isFetchingRelatedSongs } =
    useGetSongsRelatedQuery({
      songid,
    });

  if (isFetchingSongData) return <Loader title="Loading song data..." />;

  if (isFetchingRelatedSongs)
    return <Loader title="Loading related songs..." />;

  const TopChartCard = ({
    song,
    i,
    handlePauseClick,
    handlePlayClick,
    isPlaying,
    activeSong,
  }) => (
    <div className="flex flow-row w-full items-center hover:bg-slate-700 py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="  mr-3 text-white font-bold">{i + 1}.</h3>
      <div className="flex flex-row justify-between flex-1 items-center">
        <img
          className=" w-20 h-20 rounded-lg "
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className=" text-white text-xl font-bold">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song.artists[0]?.adamid}`}>
            <p className=" text-gray-500 mt-1 text-base">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs?.tracks, i }));
    dispatch(playPause(true));
  };
  console.log(songData);
  console.log(relatedSongs);

  return (
    <div className="flex flex-col">
      <div className="mb-10 text-white">
        <h2 className=" text-white text-3xl font-bold ">Lyrics:</h2>
        <div className="mt-5">
          <div className="w-full flex items-center">
            <img
              className="rounded-full mr-6 w-[10rem] border-2 h-[10rem] object-cover"
              src={songData?.images?.background}
              alt={songData?.images?.background}
            />
            <div>
              <div className="text-xl font-bold">{songData?.title}</div>
              <div className=" text-slate-500">{songData?.subtitle}</div>
              {/* <div className=" text-slate-500">{songData.artists[0].alias}</div> */}
            </div>
          </div>
          {songData.sections[1]?.type === "LYRICS" ? (
            songData.sections[1]?.text.map((line, i) => (
              <p>
                {i}: {line}
              </p>
            ))
          ) : (
            <p>Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
      <div>
        {relatedSongs?.tracks?.map((song, i) => {
          return (
            <TopChartCard
              handlePauseClick={handlePauseClick}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlayClick={() => handlePlayClick(song, i)}
              song={song}
              i={i}
              key={song.key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SongDetails;
