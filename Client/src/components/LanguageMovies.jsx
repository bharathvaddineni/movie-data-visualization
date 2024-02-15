/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import axios from "axios";
import { setMovieData } from "../store/movieSlice";


function DecadeMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const movieData = useSelector((state) => state.movie.movieData);
  const dispatch = useDispatch()
  const { language } = useParams();
  // Mapping between language codes and actual languages
  const languageMap = {
    ab: "Abkhazian",
    af: "Afrikaans",
    am: "Amharic",
    ar: "Arabic",
    as: "Assamese",
    az: "Azerbaijani",
    be: "Belarusian",
    bg: "Bulgarian",
    bn: "Bengali",
    bo: "Tibetan",
    bs: "Bosnian",
    ca: "Catalan",
    ch: "Chamorro",
    cn: "Chinese",
    cr: "Cree",
    cs: "Czech",
    cy: "Welsh",
    da: "Danish",
    de: "German",
    dz: "Dzongkha",
    el: "Greek",
    en: "English",
    es: "Spanish",
    et: "Estonian",
    eu: "Basque",
    fa: "Persian",
    fi: "Finnish",
    fr: "French",
    ga: "Irish",
    gd: "Gaelic",
    gl: "Galician",
    gn: "Guarani",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    hr: "Croatian",
    ht: "Haitian",
    hu: "Hungarian",
    hy: "Armenian",
    id: "Indonesian",
    is: "Icelandic",
    it: "Italian",
    iu: "Inuktitut",
    ja: "Japanese",
    jv: "Javanese",
    ka: "Georgian",
    kk: "Kazakh",
    kl: "Greenlandic",
    ko: "Korean",
    ku: "Kurdish",
    la: "Latin",
    lb: "Luxembourgish",
    lt: "Lithuanian",
    lv: "Latvian",
    mg: "Malagasy",
    mi: "Maori",
    mk: "Macedonian",
    ml: "Malayalam",
    mn: "Mongolian",
    mo: "Moldavian",
    mr: "Marathi",
    ms: "Malay",
    my: "Burmese",
    nb: "Norwegian Bokmål",
    ne: "Nepali",
    nl: "Dutch",
    nn: "Norwegian Nynorsk",
    no: "Norwegian",
    oc: "Occitan",
    os: "Ossetian",
    pa: "Punjabi",
    pl: "Polish",
    pt: "Portuguese",
    qu: "Quechua",
    ro: "Romanian",
    ru: "Russian",
    sa: "Sanskrit",
    se: "Northern Sami",
    sh: "Serbo-Croatian",
    si: "Sinhalese",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    sq: "Albanian",
    sr: "Serbian",
    st: "Sotho",
    sv: "Swedish",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tk: "Turkmen",
    tl: "Tagalog",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    xx: "Not applicable",
    yi: "Yiddish",
    za: "Zhuang",
    zh: "Chinese",
    zu: "Zulu",
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/movies");
      const data = response.data;
      // Set movie data
      dispatch(setMovieData(data));
    }
    if (!movieData.length > 0) {
      fetchData();
    }
    const languageMovies = movieData.filter(
      (movie) => movie.original_language === language
    );
    setMovies(languageMovies);
  }, [movieData,dispatch,language]);

  const indexOfLastMovie = Math.min(currentPage * moviesPerPage, movies.length);
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div
      className="container text-center mt-4 mx-auto px-4"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-slate-300">
        {languageMap[language]} Movies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMovies.map((movie) => (
          <a
            href={movie.homepage}
            key={movie.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                className="object-cover object-center h-64 w-full"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-600">
                  Release Year: {movie.release_date.substring(0, 4)}
                </p>
                <p className="text-gray-600">Rating: {movie.vote_average}</p>
                <p className="mt-2 text-gray-700">{movie.overview}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Pagination
          count={Math.ceil(movies.length / moviesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{ "& .MuiPaginationItem-root": { backgroundColor: "white", color: "black", border: "1px solid black" }, "& .Mui-selected": { color: "white", backgroundColor: "black", border: "1px solid black" } }}
        />
      </div>
    </div>
  );
}

export default DecadeMovies;
