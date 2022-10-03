import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-cycle
import { SongCard, Error, Loader } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("DE");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const key = import.meta.env.VITE_GEO_API_KEY;
  const { data: countryData, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    const getCountry = async () => {
      fetch(`https://geo.ipify.org/api/v2/country?apiKey=${key}`)
        .then((res) => res.json())
        .then((data) => (data?.location?.country !== "NG" ? setCountry(`${data?.location?.country}`) : setCountry("DE")))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    getCountry();
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-gray-400 text-left mt-4 mb-10">
        Around You <span className="font-black ">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {countryData.map((song, i) => (
          <SongCard key={song.key} song={song} activeSong={activeSong} isPlaying={isPlaying} data={countryData} i={i} />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
