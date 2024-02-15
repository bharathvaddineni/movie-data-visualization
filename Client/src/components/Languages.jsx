/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LanguageChart() {
  const [languageData, setLanguageData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }],
  });
  const movieData = useSelector((state) => state.movie.movieData);
  const doughnutChartRef = useRef();
  const navigate = useNavigate()
  ChartJS.defaults.color = "#ffffff";
  useEffect(() => {
    const languages = {};
    
    // Count the number of movies for each language
    movieData.forEach((movie) => {
      const language = movie.original_language;
      if (!languages[language]) {
        languages[language] = 0;
      }
      languages[language]++;
    });

    // Extract labels and data for Chart.js
    const labels = Object.keys(languages);
    const data = Object.values(languages);

    // Generate random colors for doughnut segments
    const backgroundColor = labels.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);

    setLanguageData({
      labels,
      datasets: [{
        data,
        backgroundColor,
      }],
    });
  }, [movieData]);

  useEffect(() => {
    // Create the doughnut chart using Chart.js
    if (languageData.labels.length > 0) {
      const canvas = document.getElementById("language-chart");
      const chart = canvas.getContext("2d");
      doughnutChartRef.current?.destroy();
      doughnutChartRef.current = new ChartJS(chart, {
        type: "doughnut",
        data: languageData,
        options: {
          
          plugins: {
            title: {
              display: true,
              text: "Movies by Language",
              font: {
                size: 24,
                weight: "bold",
              },
            },

          },
          onClick: (event, elements) => {
            if (elements && elements.length > 0) {
              const langIndex = elements[0].index;
              const langauge = languageData.labels[langIndex];
              
              navigate(`/movies/language/${langauge}`);
            }
          },
        },
      });
    }
  }, [languageData]);

  return (
   

    <div className="bg-neutral-700 text-white p-4 h-96 rounded-xl shadow-white shadow flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="flex felx-row justify-around">
        <h2 className="text-xl font-bold mb-4 italic">Movies Released By langauge</h2>
      </div>

      <div className=" mx-auto">
        <div className="mx-auto items-end" >
          {languageData["labels"].length > 0 ? (
            <canvas id="language-chart" />
          ) : (
            <p className="text-center">Loading data.........</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanguageChart;
