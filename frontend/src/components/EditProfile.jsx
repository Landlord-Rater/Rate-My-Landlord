import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import FormTitle from "./FormTitle.jsx";
import FormSubmit from "./FormSubmit.jsx";

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

  const EditProfile = () => {
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

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="itemscontainer w-80 bg-primary text-white grid grid-cols-2"> 
      <div className="editFields col-span-2">
        <FormTitle>Edit Profile</FormTitle>
      </div>
      <form onSubmit={EditProfile}
        className={"bg-primary drop-shadow rounded p-6 space-y-6 w-80"}>
        <FormInput
          label="Username"
          name="Username"        
          defaultValue={localStorage.getItem("user")}
          onChange={usernameOnChange}>
        </FormInput>
        <FormInput
          label="City"
          name="City"   
          defaultValue={localStorage.getItem("city")}
          onChange={cityOnChange}>
        </FormInput>
        <FormInput
          label="Email"
          name="Email"       
          defaultValue={localStorage.getItem("email")}
          onChange={emailOnChange}>
        </FormInput>
        <FormSubmit value="Save"/>
      </form>
      {/* <div>{props}</div>
      <button type="button" className="navButtons col-span-2" onClick={EditProfile}>
        Save
      </button> */}
      </div>
    </div>
  );
};

export default EditProfile;
