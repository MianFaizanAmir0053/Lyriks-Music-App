import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, data, i, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 z-10 ${
            activeSong === song ? "flex" : "hidden"
          } flex hover:visible justify-center items-center bg-black bg-opacity-50 group-hover:flex`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          className="absolute w-full object-cover"
          src={song.images?.coverart}
          alt=""
        />
      </div>
      <div className="mt-4 flex flex-col text-white">
        <p className="font-semibold">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className=" text-gray-300 mt-1 truncate text-xs">
          <Link
            to={
              song.artists
                ? `/artists/${song.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
