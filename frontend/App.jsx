import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./src/components/Navbar.jsx";
import SearchPage from "./src/components/SearchPage.jsx"; // characters
import LandlordPage from "./src/components/LandlordPage.jsx"; // customize character
import LandlordReviewCardPage from "./src/components/LandlordReviewCardPage.jsx";
import Login from "./src/components/Login.jsx";
import Logout from "./src/components/Logout.jsx";
import Signup from "./src/components/Signup.jsx";
import AddLandlord from "./src/components/AddLandlord.jsx";
import ProfilePage from "./src/components/ProfilePage.jsx";
import EditProfile from "./src/components/EditProfile.jsx";
import PageNotFound from "./src/components/PageNotFound.jsx";
import Cookies from 'js-cookie';

const App = () => {
  const ssidCookie = Cookies.get('ssid');
  const [isLoggedIn, setIsLoggedIn] = useState(ssidCookie);
  const navigate = useNavigate();
  const loginUser = async (credentials, navigate, updateLoginStatus, from) => {
    return fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "user authenicated!") {
          updateLoginStatus(true);
          localStorage.setItem("user", data.user);
          localStorage.setItem("email", data.email);
          localStorage.setItem("userID", data.userID);

          const destination = from === "signup" ? "../" : -1;
          navigate(destination);
        }
      });
  };

  const updateLoginStatus = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <div className="router">
      <main>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route exact path="/landlord" element={<LandlordPage />} />
          <Route
            exact
            path="/landlord/reviews/:city"
            element={<LandlordReviewCardPage />}
          />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
          <Route
            exact
            path="/login"
            element={
              <Login
                updateLoginStatus={updateLoginStatus}
                loginUser={loginUser}
                navigate={navigate}
              />
            }
          />
          <Route
            exact
            path="/logout"
            element={<Logout updateLoginStatus={updateLoginStatus} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/addlandlord" element={<AddLandlord />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
