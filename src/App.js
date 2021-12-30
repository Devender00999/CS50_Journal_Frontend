import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditJournalPage from "./pages/EditJournalPage";
import JournalPage from "./pages/JournalPage";
import Journals from "./pages/Journals";
function App() {
  const loginned = localStorage.getItem("loginToken") && true;
  const [isLoggedIn, setIsLoggedIn] = useState(loginned);
  return (
    <Routes>
      <Route
        path="/register"
        element={
          !isLoggedIn ? (
            <Home Component={RegisterPage} isLoggedIn={isLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Home Component={LoginPage} isLoggedIn={isLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
      <Route
        path="/journals/new"
        element={
          isLoggedIn ? (
            <Home
              Component={EditJournalPage}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      ></Route>
      <Route
        path="/journals/:id"
        element={
          isLoggedIn ? (
            <Home
              Component={EditJournalPage}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      ></Route>
      <Route
        path="/journal/:id"
        element={
          isLoggedIn ? (
            <Home
              Component={JournalPage}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      ></Route>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Home
              Component={Journals}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      ></Route>
    </Routes>
  );
}

export default App;
