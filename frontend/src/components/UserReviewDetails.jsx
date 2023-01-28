import React from "react";
import axios from "axios";
import ModalEditReview from "./ModalEditReview.jsx";
import { useNavigate } from "react-router-dom";

const UserReviewDetails = ({ review, fetchReviews }) => {
  let reviewID = review.user_id;
  const navigate = useNavigate();

  const deleteReview = async (reviewID) => {
    console.log(reviewID);
    alert(`Are you sure you want to delete this rating?`);
    axios
      .delete(`/reviews/${reviewID}`, { data: { review: review.text } }) // <-- remove ;
      .then(() => {
        console.log(reviewID);
        navigate("/profile");
        fetchReviews();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="review-details bg-secondary  p-4 rounded-md  text-gray-600 mb-3">
      <p>
        <strong className="mr-1">Name of Landlord:</strong>
        {review.name}
      </p>
      <p>
        <strong className="mr-1">Location:</strong>
        {review.location}
      </p>
      <strong className="mr-1">Rating:</strong>
      {review.rating}/5
      <p>{/* <strong className='mr-1'>Comments:</strong> */}</p>
      <strong className="mr-1">Review:</strong>
      {review.text}
      <br />
      <br />
      <button
        onClick={() => deleteReview(reviewID)}
        type="button"
        className="
        modal-button
        px-6
        py-2.5
        m-1
        bg-primary
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        transition
        duration-150
        ease-in-out"
      >
        Delete Review
      </button>
      <br />
      {/* <button
        onClick={() => editReview(reviewID)}
        className="w-half bg-primary rounded text-white hover:text-dark-purple transition text-lg cursor-pointer py-2"
      >
        Edit Review
      </button> */}
      <ModalEditReview review={review} />
    </div>
  );
};

export default UserReviewDetails;
