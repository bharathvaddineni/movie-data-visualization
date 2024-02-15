/* eslint-disable no-unused-vars */
// src/components/GenrePopularityDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedYear,
  setYears,
  setMovieData,
  setPieChartData,
} from "../store/movieSlice";
import Genre from "./Genre";
import Years from "./Years";
import Languages from "./Languages.jsx"

const GenrePopularityDashboard = () => {
  // State variables

  const movieData = useSelector((state) => state.movie.movieData);
  const dispatch = useDispatch();

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies");
      console.log("Get data done");
      const data = response.data;

      // Set movie data
      dispatch(setMovieData(data));

      // Extract unique years from data
      const uniqueYears = [
        "All",
        ...new Set(
          data?.map(
            (movie) => movie.release_date && movie.release_date.slice(0, 4)
          )
        ),
      ];
      dispatch(setYears(uniqueYears.sort()));

      // Initialize pie chart data and radar chart data
      const initialPieData = generatePieData(data, "All");

      dispatch(setPieChartData(initialPieData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to generate pie chart data
  const generatePieData = (data, year) => {
    // Filter data based on the selected year
    const filteredData =
      year === "All"
        ? data
        : data.filter((movie) => movie.release_date.startsWith(year));

    // Count the number of movies in each genre
    const genreCount = filteredData.reduce((acc, movie) => {
      const genres = movie.genres.split(","); // Split genres string into an array
      genres.forEach((genre) => {
        acc[genre.trim()] = acc[genre.trim()] ? acc[genre.trim()] + 1 : 1; // Trim genre name to remove any leading/trailing spaces
      });
      return acc;
    }, {});

    // Convert genreCount object to arrays for Chart.js
    const labels = Object.keys(genreCount);
    const dataValues = Object.values(genreCount);
    const backgroundColors = [
      "rgba(255, 99, 132)",
      "rgba(54, 162, 235)",
      "rgba(255, 206, 86)",
      "rgba(75, 192, 192)",
      "rgba(153, 102, 255)",
      "rgba(255, 159, 64)",
    ];
    return {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
        },
      ],
    };
  };

  // Function to generate radar chart data

  // Function to handle year selection change
  const handleYearChange = (event) => {
    const year = event.target.value;

    dispatch(setSelectedYear(year));
    // Update pieChartData and radarChartData based on the selected year
    const newPieData = generatePieData(movieData, year);
    dispatch(setPieChartData(newPieData));
  };

  return (
    <div className="flex flex-row m-8">
      <div className="w-1/3 m-2">
        <Genre handleYearChange={handleYearChange} />
      </div>
      <div className="w-1/3 m-2">
      <Years />
      </div>
      <div className="w-1/3 m-2">
      <Languages />
      </div>
    </div>
  );
};

export default GenrePopularityDashboard;
