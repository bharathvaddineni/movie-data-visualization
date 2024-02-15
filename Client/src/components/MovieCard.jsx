/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function MovieCard({ movie }) {
  return (
    <div>
      <a href={movie.homepage}
      target="_blank"
      rel="noopener noreferrer"
      >
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          role="button"
        >
          {/* Movie poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover object-center"
          />

          {/* Movie details */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-600 mb-2">
              Release Year: {new Date(movie.release_date).getFullYear()}
            </p>
            <p className="text-gray-600 mb-2">Rating: {movie.vote_average}</p>
            <p className="text-gray-600 mb-2">
              Language: {movie.original_language}
            </p>
            <p className="text-gray-600">Genre: {movie.genres}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default MovieCard;
