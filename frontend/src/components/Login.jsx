import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import { useLocation } from "react-router-dom";
<<<<<<< HEAD
import Goauth from "../assets/google.svg";
=======
import GoogleLogo from "../assets/google.svg"
>>>>>>> dev

async function loginUser(credentials, navigate, updateLoginStatus, from) {
  return fetch("/user/login", {
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
        localStorage.setItem("city", data.city);

        const destination = from === "signup" ? "../" : -1;
        navigate(destination);
      }
    });
}

export default function Login({ updateLoginStatus }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  let from;
  if (location.state) from = location.state.from;

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(
      {
        ...userInfo,
      },
      navigate,
      updateLoginStatus,
      from
    );
  };

  // const handleoath = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/auth/google');
  //       const data = await response.json();
  //     // Do something with the data
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  // }

  return (
    <section class="bg-page login-page h-full p-4 bg-cover">

    <div className="inset-0 flex justify-center items-center mt-6 ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}
<<<<<<< HEAD
=======

        <div id="google-oauth-container"
        className="
          bg-primary
          drop-shadow
          rounded
          p-2
          my-6
          space-y-1
          w-80
          font-semibold
          text-white
          text-xl
          text-center
          transition
          self-start">
        <a href="/oauth/google"
        className="w-full h-full ">
          <GoogleLogo className="svg float-left h-fit" />
          <p className="clearfix mt-2">Sign In with Google</p>
        </a>
        </div>


>>>>>>> dev
        <form
          onSubmit={handleSubmit}
          className={"bg-primary drop-shadow rounded p-6 space-y-6 mt-10 w-80"}
        >
          <FormTitle>Log In with Email</FormTitle>
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="email@email.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormSubmit value="Submit" />
        </form>

        <button
          data-testid="signup-button"
          type="submit"
          className="w-full bg-primary rounded text-white hover:text-dark-purple transition font-semibold text-lg cursor-pointer py-2"
        >
          <Link to="/signup">
            <p>Sign Up with Email</p>
          </Link>
        </button>
<<<<<<< HEAD
        <a href="/oauth/google">
          <Goauth className="svg"></Goauth>
        </a>
=======

>>>>>>> dev
      </Container>
    </div>

    </section>
  );
}
