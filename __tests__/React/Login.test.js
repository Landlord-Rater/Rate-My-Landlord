import React from "React";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter, useNavigate } from "react-router-dom";

// IMPORT REACT COMPONENT
import Login from "../../frontend/src/components/Login";

describe("Login page", () => {
  let loginPage;
  const loginUser = jest.fn();
  const updateLoginStatus = jest.fn();
  const navigate = jest.fn();
  let from;

  beforeEach(() => {
    jest.clearAllMocks();
    loginPage = render(
      <Login
        updateLoginStatus={updateLoginStatus}
        loginUser={loginUser}
        navigate={navigate}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
  });

  it("should render username/email input", () => {
    expect(
      loginPage.getByPlaceholderText(/email@email.com/i)
    ).toBeInTheDocument();
  });

  it("should render empty username/email input text", () => {
    const userNameInputEl = loginPage.getByPlaceholderText(/email@email.com/i);
    expect(userNameInputEl.value).toBe("");
  });

  it("should render username input values", async () => {
    const userNameInputEl = loginPage.getByPlaceholderText(/email@email.com/i);
    const testEmail = "test@gmail.com";
    await userEvent.type(userNameInputEl, testEmail);
    expect(userNameInputEl.value).toBe(testEmail);
  });

  it("should render password input", () => {
    expect(
      loginPage.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i)
    ).toBeInTheDocument();
  });

  it("should render username input values", async () => {
    const passwordInputEl = loginPage.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
    const testPassword = "password";
    await userEvent.type(passwordInputEl, testPassword);
    expect(passwordInputEl.value).toBe(testPassword);
  });

  it("should render empty password input text", async () => {
    const passwordInputEl = loginPage.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
    expect(passwordInputEl.value).toBe("");
  });

  it("should render sign in button", () => {
    expect(
      loginPage.getByRole("button", { name: "Submit" })
    ).toBeInTheDocument();
  });

  it("should render sign up button", async () => {
    const signupButton = loginPage.getByTestId("signup-button");
    const link = within(signupButton).getByRole("link");
    expect(within(link).getByText(/sign up/i)).toBeInTheDocument();
  });

  it("should submit call to loginUser with email and password user credentials, navigate function, updateLoginStatus function, and from", async () => {
    const loginButton = loginPage.getByRole("button", { name: "Submit" });
    const userNameInputEl = loginPage.getByPlaceholderText(/email@email.com/i);
    const passwordInputEl = loginPage.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
    await userEvent.type(userNameInputEl, "testEmail@gmail.com");
    await userEvent.type(passwordInputEl, "testPassword");
    await userEvent.click(loginButton);

    expect(loginUser).toHaveBeenCalledWith(
      {
        email: "testEmail@gmail.com",
        password: "testPassword",
      },
      navigate,
      updateLoginStatus,
      from
    );

    expect(loginUser).toHaveBeenCalledTimes(1);
  });
});

// TALK TO FRONT END TEAM ABOUT ITEMS BELOW:

// Talk to Jason or Bjorn about putting button inside of link element for login page
// Disable login button if email and password are not inputted - limit api calls to the db
// Need to change input forms to closed input values - email and password
