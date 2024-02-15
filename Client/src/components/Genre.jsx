/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";

import { Chart as ChartJS } from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Genre({ handleYearChange }) {
  const selectedYear = useSelector((state) => state.movie.selectedYear);
  const years = useSelector((state) => state.movie.years);
  const pieChartData = useSelector((state) => state.movie.pieChartData);
  const pieChartRef = useRef(null);
  const  navigate = useNavigate();
  const dispatch = useDispatch();
  ChartJS.defaults.color = "#ffffff";

  useEffect(() => {
    if (pieChartData["labels"].length > 0) {
      const canvas = document.getElementById("canvas");
      const chart = canvas.getContext("2d");
      pieChartRef.current?.destroy();
      console.log("Chart: ", chart);
      pieChartRef.current = new ChartJS(chart, {
        type: "pie",
        data: {
          labels: pieChartData["labels"],
          datasets: [...pieChartData["datasets"]],
        },
        options:{
            onClick:(event,elements) => {
                if(elements && elements.length > 0){
                    const genre = pieChartData.labels[elements[0].index]
                    navigate(`/movies/${selectedYear}/${genre}`)
                }
            },
            plugins:{
              datalabels:{
                color: "#fff"
              }
            }
        }
      });
    }
  }, [pieChartData]);

  return (
    <div className="bg-neutral-700 text-white p-4 h-96 rounded-xl shadow-white shadow flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="flex felx-row justify-around">
        <h2 className="text-xl font-bold mb-4 italic">Genre Popularity</h2>
        <div className="mb-4">
          <label htmlFor="year" className="text-xl mr-4">
            Year:
          </label>
          <select
            id="year"
            className="outline-none min-w-20 text-black"
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

      <div className=" mx-auto">
        <div className="mx-auto">
          {pieChartData["labels"].length > 0 ? (
            <canvas id="canvas"  className="text-white"/>
          ) : (
            <p className="text-center">Loading data.........</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Genre;
