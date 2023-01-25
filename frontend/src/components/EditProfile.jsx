import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const EditProfile = ({ props }) => {
  const [username, usernameOnChange] = useInput("");
  const [city, cityOnChange] = useInput("");
  const [email, emailOnChange] = useInput("");
  const userID = localStorage.getItem("userID");
  // const [email, emailOnChange] = useInput('')
  const navigate = useNavigate();

  const SaveRating = () => {
    const body = {
      username,
      city,
      email,
      userID,
    };
    fetch("/api/editprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/profile");
      })
      .catch((err) => console.log("edit rating"));
  };

  return (
    <div className="flex flex-col items-center py-2">
      <br />
      <label htmlFor="username">Username: </label>
      <input
        name="username"
        value={username}
        onChange={usernameOnChange}
      ></input>
      <br />
      <label htmlFor="city">City: </label>
      <input name="city" value={city} onChange={cityOnChange}></input>
      <br />
      <label htmlFor="email">Email: </label>
      <input name="email" value={email} onChange={emailOnChange}></input>
      <br />
      <br />
      <div>{props}</div>
      <br></br>
      <button type="button" className="navButtons" onClick={SaveRating}>
        Save
      </button>
    </div>
  );
};

export default EditProfile;
