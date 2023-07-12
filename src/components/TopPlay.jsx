import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useGetDeezerQuery } from "../redux/services/deezerCore";

import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const TopChartCard = ({
  song,
  i,
  handlePauseClick,
  handlePlayClick,
  isPlaying,
  activeSong,
}) => (
  <div
    className={`flex flow-row w-full items-center hover:bg-slate-700 ${
      activeSong === song ? "bg-slate-700" : ""
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
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
        <Link to={`/artists/${song?.artists[0]?.adamid}`}>
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

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data } = useGetDeezerQuery();
  const divRef = useRef(null);
  const { data, isFetching, error } = useGetDeezerQuery();
  const data1 = data.tracks;
  const topSongs = data1?.slice(0, 5);
  useEffect(() => {
    divRef.current.scrollIntoView();
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: data1, i }));
    dispatch(playPause(true));
  };

  if (isFetching) {
    return <Loader title={"Loading Top Songs..."} />;
  }

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full mt-10 lg:mt-5 flex flex-col">
        <div className="flex flex-row justify-between items-center ">
          <h2 className="font-bold text-white text-2xl">Top Charts</h2>
          <Link
            to={"/top-charts"}
            className=" cursor-pointer text-gray-300 text-base"
          >
            see more
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topSongs?.map((song, i) => {
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

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="font-bold text-white text-2xl">Top Artists</h2>
          <Link
            to={"/top-artists"}
            className=" cursor-pointer text-gray-300 text-base"
          >
            see more
          </Link>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
        >
          {topSongs?.map((song) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "30%", height: "auto" }}
              className="text-white shadow-lg rounded-full animate-slideright"
            >
              <Link className="" to={`artists/${song?.key}`}>
                <div>{song?.artists[0].alias}</div>
                <img
                  src={song?.images.background}
                  alt="name"
                  className=" rounded-full w-full bg-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
