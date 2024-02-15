/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DecadeMovies() {
  const [decadeData, setDecadeData] = useState({
    labels:[],
    data:[]
  });


  const movieData = useSelector(state=>state.movie.movieData)
  const barChartRef = useRef()
  const navigate = useNavigate()
  Chart.defaults.color = "#ffffff";

  useEffect(() => {
    const moviesPerDecade = {};

    // Calculate the number of movies in each decade
    movieData.forEach((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      const decadeStartYear = Math.floor(releaseYear / 10) * 10;
      const decadeEndYear = decadeStartYear + 9; // Decade ends 9 years later
      const decade = `${decadeStartYear}-${decadeEndYear}`;
      

      if (!moviesPerDecade[decade]) {
        moviesPerDecade[decade] = 0;
      }
      moviesPerDecade[decade]++;
    });

    
    JSON.stringify(moviesPerDecade)

    const ordered = Object.keys(moviesPerDecade).sort().reduce(
        (obj, key) => { 
          obj[key] = moviesPerDecade[key]; 
          return obj;
        },
        {}
      );
    // Convert data to format required by Chart.js
    const labels = Object.keys(ordered);
    const data = labels.map((decade) => ordered[decade]);



    // Update state with decade data
    setDecadeData({ labels, data });
  }, [movieData]);

  useEffect(() => {
    // Create the bar chart using Chart.js
    if (decadeData.labels.length > 0) {
        const canvas = document.getElementById("decade-chart");
      const chart = canvas.getContext("2d");
      barChartRef.current?.destroy();
     
      barChartRef.current = new Chart(chart, {
        type: "bar",
        data: {
          labels: decadeData.labels,
          datasets: [
            {
              label: "Number of Movies",
              data: decadeData.data,
              backgroundColor: "rgba(75, 192, 192)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Movies",
                color: '#ff2345'
              },
            },
            x: {
              title: {
                display: true,
                text: "Decade",
                color: '#ff2345'
              },
            },
          },
          plugins: {

            title: {
              display: true,
              text: "Number of Movies Released in Each Decade",
              color: '#fff'
            },

          },
          onClick: (event, elements) => {
            if (elements && elements.length > 0) {
              const decadeIndex = elements[0].index;
              const decade = decadeData.labels[decadeIndex];
              navigate(`/movies/decade/${decade}`);
            }
          },
        },
      });
    }
  }, [decadeData]);

  return (
   

    <div className="bg-neutral-700 text-white rounded-xl shadow-white shadow p-4 h-96 flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="flex felx-row justify-around">
        <h2 className="text-xl font-bold mb-4 italic">Movies Released in Each Decade</h2>
      </div>

      <div className=" w-full mx-auto">
        <div className="mx-auto items-end" >
          {decadeData["labels"].length > 0 ? (
            <canvas id="decade-chart" style={
                { width: '100%', height:'12vw' }
            }/>
          ) : (
            <p className="text-center">Loading data.........</p>
          )}
        </div>
      </div>
    </div>


  );
}

export default DecadeMovies;
