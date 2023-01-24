import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import { useLocation } from "react-router-dom";

export default function Login({ updateLoginStatus, loginUser, navigate }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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

  return (
    <div className="inset-0 flex justify-center items-center mt-6 ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}

        <form
          onSubmit={handleSubmit}
          className={"bg-primary drop-shadow rounded p-6 space-y-6 w-80"}
        >
          <FormTitle>Log in</FormTitle>
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
            <p>Sign up</p>
          </Link>
        </button>
      </Container>
    </div>
  );
}
