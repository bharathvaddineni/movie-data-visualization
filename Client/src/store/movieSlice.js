import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    selectedYear: "All",
    years: [],
    movieData: [],
    pieChartData: {
      labels: [],
      datasets: [{}],
    },
    decadesData: {
        labels: [],
        datasets: [{}],
      },
  },
  reducers:{
    setSelectedYear: (state, action)=>{
        state.selectedYear = action.payload
    },
    setYears: (state,action) =>{
        state.years=action.payload;
    },
    setMovieData: (state,action)=>{
        state.movieData=action.payload;
    },
    setPieChartData: (state,action)=>{
       state.pieChartData=action.payload;
    },
    setDecadesData: (state,action)=>{
        state.pieChartData=action.payload;
     }
  }
});


export const { setSelectedYear, setYears, setMovieData,setPieChartData,setDecadesData } = movieSlice.actions

export default movieSlice.reducer