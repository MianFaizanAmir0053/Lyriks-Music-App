import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetArtistsDetailsQuery,
  useGetArtistsTopSongsQuery,
} from "../redux/services/deezerCore";

const ArtistDetails = () => {
  const { id } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: errorArtistDetails,
  } = useGetArtistsDetailsQuery({ id });

  const {
    data: artistTopSongs,
    isFetching: isFetchingArtistTopSongs,
    error,
  } = useGetArtistsTopSongsQuery({ id });

  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  if (errorArtistDetails) return <Error />;

  if (isFetchingArtistTopSongs)
    return <Loader title="Loading artist top songs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={id} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={artistTopSongs?.data}
        artistId={id}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
