/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { setSelectedYear } from "../store/movieSlice";
import { useDispatch } from "react-redux";
import { setMovieData } from "../store/movieSlice";
import axios from "axios";


function GenreMovies() {
  const { year, genre } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  console.log("Year, genre: ", year, genre);
  const [genreMovies, setGenreMovies] = useState([]);
  const movieData = useSelector((state) => state.movie.movieData);
  const dispatch = useDispatch()
  dispatch(setSelectedYear('All'))
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
    // Filter movies based on the selected genre and year
    let filteredMovies = movieData.filter((movie) =>
      movie.genres.includes(genre)
    );
    if (year !== "All") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.release_date.startsWith(year)
      );
    }
    console.log("filteredMovies: ", filteredMovies);
    setGenreMovies(filteredMovies);
  }, [movieData, year,dispatch, genre]);
  const indexOfLastMovie = Math.min(currentPage * moviesPerPage, genreMovies.length);
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = genreMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    
    <div className="container text-center mt-4 mx-auto px-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h2 className="text-2xl font-semibold mb-4 text-slate-300">
        Movies for {genre}  {year === "All" ? "in all years" : <span>in ${year}</span>}
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
      <div className="my-6 flex justify-center">
        <Pagination
          count={Math.ceil(genreMovies.length / moviesPerPage)}
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

export default GenreMovies;
