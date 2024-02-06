import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import Header from "./components/globals/Header.jsx";
import Footer from "./components/globals/Footer.jsx";
// import LandingPage from "./pages/landingPage/LandingPage.jsx";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";

import destinations from "./data/destinations.json";
import activities from "./data/activities.json";
import activityCategories from "./data/activitycategories.json";
import destinationCategories from "./data/destinationcategories.json";
import navigations from "./data/navigations.json";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage destinations={destinations} activities={activities} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Header navigations={navigations} ></Header>
      <RouterProvider router={router} />
      <Footer navigations={navigations} />
    </React.StrictMode>
  </Provider>
);
