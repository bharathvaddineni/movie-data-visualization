/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { setMovieData } from "../store/movieSlice";
import axios from "axios";

function DecadeMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const movieData = useSelector((state) => state.movie.movieData);
  const { decade } = useParams();
  const dispatch = useDispatch()

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
    // Extract start and end years from the decade range
    const [startYear, endYear] = decade.split("-").map(Number);
  

    // Filter movie data for movies released within the decade
    const decadeMovies = movieData.filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

    setMovies(decadeMovies);
  }, [decade,dispatch, movieData]);

  const indexOfLastMovie = Math.min(currentPage * moviesPerPage, movies.length);
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container text-center mx-auto mt-4 px-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
    <h2 className="text-2xl font-semibold mb-4 text-slate-300">
      Movies for the decade {decade}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentMovies.map((movie) => (
          <a href={movie.homepage} key={movie.id}target="_blank" rel="noopener noreferrer">
        <div  className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            className="object-cover object-center h-64 w-full"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-600">Release Year: {movie.release_date.substring(0, 4)}</p>
            <p className="text-gray-600">Rating: {movie.vote_average}</p>
            <p className="mt-2 text-gray-700">{movie.overview}</p>
          </div>
        </div>
        </a>
      ))}
    </div>
    <div className="my-6 flex justify-center ">
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
