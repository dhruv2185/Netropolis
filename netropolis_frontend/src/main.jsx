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
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import SearchQuestsPage from "./pages/SearchQuestsPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import TeamRegistrationPage from "./pages/TeamRegistrationPage.jsx";
import ApplicationPage from "./pages/ApplicationPage.jsx";
import RegisterQuest from "./pages/RegisterQuest.jsx";
import ScheduleQuestPage from "./pages/ScheduleQuestPage.jsx";
import RegisterTaskPage from "./pages/RegisterTaskPage.jsx";

import destinations from "./data/destinations.json";
import activities from "./data/activities.json";
import activityCategories from "./data/activitycategories.json";
import destinationCategories from "./data/destinationcategories.json";
import ViewTeams from "./pages/ViewTeams.jsx";
import ViewUserApplications from "./pages/ViewUserApplications.jsx";
import ViewCMApplications from "./pages/ViewCMApplications.jsx";
import ExploreQuestsPage from "./pages/ExploreQuestsPage.jsx";
import ViewCMQuests from "./pages/ViewCMQuests.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage destinations={destinations} activities={activities} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchQuestsPage destinations={destinations} destinationCategories={destinationCategories} />} />
      <Route path="/explore" element={<ExploreQuestsPage />} />
      <Route path="/team-registration" element={<TeamRegistrationPage />} />
      <Route path="/application/:questId" element={<ApplicationPage />} />
      <Route path="/registerquest" element={<RegisterQuest />} />
      <Route path="/schedulequest" element={<ScheduleQuestPage />} />
      <Route path="/registertask" element={<RegisterTaskPage />} />
      <Route path="/viewteams" element={<ViewTeams />} />
      <Route path="/viewapplications" element={<ViewUserApplications />} />
      <Route path="/viewCMapplications" element={<ViewCMApplications />} />
      <Route path="/viewquests" element={<ViewCMQuests />} />

    </Route>
  )
);

const clientId = "1064200584812-8fttm5kfnbojukbvh44qf103sa4skqd8.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <React.StrictMode>

        <RouterProvider router={router} />

      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);
