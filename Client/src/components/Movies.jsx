/* eslint-disable no-unused-vars */
import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import axios from "axios";
import { setMovieData } from "../store/movieSlice";

function MoviesPage() {
  const initialFilters = {
    year: "",
    rating: "",
    language: "",
    genre: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie.movieData);
  const languages = [
    ...new Set(movieData.map((movie) => movie.original_language)),
  ];
  const years = [
    ...new Set(
      movieData.map((movie) => new Date(movie.release_date).getFullYear())
    ),
  ].sort();
  const ratings = ["", "7", "8", "9"];
  const genres = [
    ...new Set(movieData.map((movie) => movie.genres.split(", ")).flat()),
  ];
  const [filteredMovies, setFilteredMovies] = useState(null);

  // Filter movies based on selected criteria
  useEffect(() => {
    const filteredMovies = movieData.filter((movie) => {
      return (
        (filters.year === "" || movie.release_date.includes(filters.year)) &&
        (filters.rating === "" ||
          movie.vote_average >= parseFloat(filters.rating)) &&
        (filters.language === "" ||
          movie.original_language === filters.language) &&
        (filters.genre === "" || movie.genres.includes(filters.genre)) &&
        (searchTerm === "" ||
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredMovies(filteredMovies);
  }, [filters, movieData, searchTerm]);

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
  }, [movieData]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filters section */}
      <div className="flex flex-wrap justify-start mb-4">
        {/* Year filter */}
        <select
          className="p-2 border border-gray-300 rounded mr-2 mb-2 focus:outline-none"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Rating filter */}
        <select
          className="p-2 border border-gray-300 rounded mr-2 mb-2 focus:outline-none"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">Select Rating</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>
              {rating === "" ? "Any" : `${rating}+`}
            </option>
          ))}
        </select>

        {/* Language filter */}
        <select
          className="p-2 border border-gray-300 rounded mr-2 mb-2 focus:outline-none"
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">Select Language</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        {/* Genre filter */}
        <select
          className="p-2 border border-gray-300 rounded mr-2 mb-2 focus:outline-none"
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2 focus:outline-none"
          />
        </div>
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-gray-800 px-2 py-2  h-full rounded hover:bg-slate-800 hover:text-white"
        >
          Reset Filter
        </button>
      </div>

      {/* Movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}

export default MoviesPage;
