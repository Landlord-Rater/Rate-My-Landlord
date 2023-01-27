import React from "react";

const ReviewDetails = ({ review }) => {
  let reviewID = review._id;
  /*The HTML Tags here are just placeholders so that way we could
ensure that we were getting the right informationa nd rendering it,
so making it pretty and readable will be a whole other task in itself
*/

  // const deleteReview = async (reviewID) => {
  //   console.log(reviewID);
  //   alert(`Are you sure you want to delete this rating?`);
  //   axios
  //     .delete(`/reviews/${reviewID}`) // <-- remove ;
  //     .then(
  //       // Issue GET request after item deleted to get updated list
  //       // that excludes note of id
  //       // this.getAllNotes()
  //       // navigate("/"),
  //       console.log(reviewID)
  //     )

  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <div className="review-details bg-secondary  p-4 rounded-md  text-gray-600 mb-3">
      <p className="label mr-1">
        Rating:
        {review.rating}/5
      </p>
      <p className="label mr-1">
        Would Rent Again:
        {review.would_rent_again > 0 ? "✓" : "𐄂"}{" "}
      </p>
      <p>Date: {review.date}</p>
      <p className="label mr-1">Comments:</p>
      <p>{review.text}</p>
      {/* <button
        onClick={() => deleteReview(reviewID)}
        className="w-full bg-primary rounded text-white hover:text-dark-purple transition text-lg cursor-pointer py-2"
      >
        Delete Review
      </button> */}
    </div>
  );
};

export default ReviewDetails;
