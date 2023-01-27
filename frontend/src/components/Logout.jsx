import React from "react";
import { Link, useNavigate } from "react-router-dom";

async function logoutUser(navigate, updateLoginStatus) {
  return fetch("/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === "logged out!") {
        localStorage.clear();
        updateLoginStatus(false);
        navigate("/");
      }
    });
}

let alreadySet = false; // prevents infinite loop

export default function Logout({ updateLoginStatus }) {
  const navigate = useNavigate();

  if (!alreadySet) {
    alreadySet = true;
    logoutUser(navigate, updateLoginStatus);
  }

  return (
    <section class="bg-page logout-page h-full p-4 bg-cover">

    <div className="logout-wrapper">
      <p>Logged out!</p>
      <Link to="/">
        <button type="button">Go to home page</button>
      </Link>
    </div>

    </section>
  );
}
