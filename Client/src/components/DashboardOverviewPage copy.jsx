/* eslint-disable no-unused-vars */
// src/components/GenrePopularityDashboard.js

import React, { useState, useEffect,useRef } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {Chart as ChartJS} from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux'
import {setSelectedYear, setYears, setMovieData,setPieChartData} from '../store/movieSlice'
import Genre from "./Genre";
const GenrePopularityDashboard = () => {
  // State variables

  const  selectedYear = useSelector((state) => state.movie.selectedYear);
  const years = useSelector((state) => state.movie.years);
  const movieData = useSelector((state)=>state.movie.movieData)
  const pieChartData = useSelector(state => state.movie.pieChartData)
  const pieChartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const  [rendered,setRendered] = useState(false)

  const dispatch = useDispatch()

  

  // Fetch data from API
  useEffect(() => {
    fetchData();
  },[]);

  useEffect(()=>{
    if(pieChartData["labels"].length > 0){

      const canvas = document.getElementById("canvas")
    const chart = canvas.getContext('2d')
    pieChartRef.current?.destroy()
    console.log("Chart: ",chart)
    pieChartRef.current = new ChartJS(chart,{
      type:'pie',
      data:{
        labels:pieChartData['labels'],
        datasets:[...pieChartData['datasets']]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Genre Popularity',
            font: {
              size: 24,
              weight: 'bold'
            }
          }
        }
      }
    })
    }


  },[pieChartData])


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
          label: "No. of movies",
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
    <div className="bg-slate-100 m-4 p-4 rounded shadow-lg md:w-1/3 w-1/2 h-auto flex flex-col">
      <div className="flex felx-row justify-around">
        <h2 className="text-xl font-bold mb-4 italic">Genre Popularity</h2>
        <div className="mb-4" title="This is a tooltip">
          <label htmlFor="year" className="text-xl mr-4">
            Year:
          </label>
          <select
            id="year"
            className="outline-none min-w-20"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years?.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className=" w-3/4 mx-auto h-auto">
        <div className="mx-auto">
          {pieChartData["labels"].length > 0 ? (

            //      <ChartJS ref={pieChartRef} type='bar'
            //   data={pieChartData}
            //   options={{
            //     plugins: {
            //       legend: { display: false },
            //       title: {
            //         display: true,
            //         text: "Number of movies released each year by genre",
            //       },
            //     },
            //   }}
            // />
            <canvas id="canvas"/>

          ) : (
            <p className="text-center">Loading data.........</p>
          )}
        </div>
      </div>
      <Genre handleYearChange={handleYearChange}/>
    </div>
  );
};

export default GenrePopularityDashboard;
