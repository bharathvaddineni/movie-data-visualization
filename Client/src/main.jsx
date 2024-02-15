import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import DashboardOverViewPage  from "../src/components/DashboardOverviewPage.jsx"
import GenreMovies from "./components/GenreMovies.jsx";
import DecadeMovies from "./components/DecadeMovies.jsx";
import LanguageMovies from "./components/LanguageMovies.jsx"
import MoviesPage from "./components/Movies.jsx";
import Contact from "./components/Contact.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"",
        element: <DashboardOverViewPage/>
      },
      {
        path: '/movies',
        element: <MoviesPage/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/movies/:year/:genre',
        element: <GenreMovies/>
      },
      {
        path: '/movies/decade/:decade',
        element: <DecadeMovies/>
      },
      {
        path: '/movies/language/:language',
        element: <LanguageMovies/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
