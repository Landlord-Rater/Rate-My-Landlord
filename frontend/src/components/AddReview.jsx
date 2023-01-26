//if logged in, renders form to submit new review to relevant landlord and updates review components
//if not logged in, prompt user in some way to log in/disallow entry of a new review

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
// const AddReview = ({ landlord }) => {
const AddReview = () => {
  const location = useLocation();
  const { landlord, from } = location.state;

  const [landlord_id, setId] = useState(landlord._id);
  const [rating, setRating] = useState(""); //should be out of 5 (don't accept a value higher in submit, so throw error)
  const [would_rent_again, setRentAgain] = useState(0); //should be yes/no boolean
  const [text, setText] = useState(""); // bigger text box
  const [date, setDate] = useState(""); // MM/YY Format
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // would_rent_again === true ? setRentAgain(1) : setRentAgain(0);
    const review = {
      userID,
      landlord_id,
      text,
      rating,
      date,
      would_rent_again,
    };

    const response = await fetch("/reviews/", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // if (!response.ok) {
        //   setError(json.error);
        // }
        setRating(""); // int
        setRentAgain(""); // 1 or 0
        setText(""); // str
        setDate(""); // str
        setError(null);
        // console.log('new review added', data);
        setSubmitted(true);
        setInterval(setSubmitted(false), 3000);
      })
      .catch((err) => setError(err));
  };
  return (
    <div className="inset-0  flex justify-center items-center ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}
        <form
          onSubmit={handleSubmit}
          className={
            " bg-primary text-white drop-shadow rounded p-6 space-y-6 w-80"
          }
        >
          <FormTitle>Add Review</FormTitle>
          <FormInput
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date:"
            placeholder="Date"
            name="date"
          />
          <FormInput
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            label="Rating:"
            placeholder="Rating"
            name="rating"
          />
          <div className="mt-5">
            <label className>
              <input
                value={would_rent_again}
                onClick={(e) => setRentAgain(1)}
                label="Would Rent Again"
                placeholder="_"
                name="RentAgain"
                type="checkbox"
              />
              Would Rent Again
            </label>
          </div>
          <FormInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Comments"
            placeholder="Tell us what you think"
            name="Comments"
            type="Text"
          />
          <FormSubmit value="Submit" />
          {error && <div className="error">{error}</div>}
          {submitted && <h3>Submission success!</h3>}
        </form>
      </Container>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddReview;
