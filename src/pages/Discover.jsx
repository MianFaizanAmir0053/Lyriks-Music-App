import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetDeezerQuery } from "../redux/services/deezerCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
  const { data, isFetching, error } = useGetDeezerQuery();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  if (isFetching) {
    return <Loader title={"Loading Songs..."} />;
  }

  const data1 = data.tracks;

  return (
    <div className="flex flex-col ">
      <div className="w-full flex items-center sm:flex-col justify-center flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white  text-left">Discover</h2>
        <select name="" className="h-full" id="">
          {genres.map((genre) => {
            return (
              <option value={genre.value} key={genre.value}>
                {genre.title}
              </option>
            );
          })}
        </select>
        <div className="flex flex-wrap justify-center gap-8">
          {data1?.map((song, i) => {
            return (
              <SongCard
                isPlaying={isPlaying}
                activeSong={activeSong}
                key={song.key}
                song={song}
                i={i}
                data={data1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Discover;
