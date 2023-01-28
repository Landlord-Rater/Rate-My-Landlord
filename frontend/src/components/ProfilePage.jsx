import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails.jsx";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [reviews, setReviews] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch("/reviews/" + userID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setReviews(data);
        // console.log(data);
      });
    // console.log(users).then(console.log('data in fetch', users));
  }, []);

  const fetchReviews = () => {
    fetch("/reviews/" + userID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setReviews(data);
        // console.log(data);
      });
  };

  return (
    <section class="search-page bg-page h-full p-4 bg-cover">
      <div className="centeringBox inset-0 flex flex-col justify-center items-center mt-6 w-160">
        <div className="profileContainer grid grid-cols-2 bg-primary text-white rounded text-l font-semibold w-160">
          <Link to="/editProfile" className="col-span-2">
            <h3 className="text-gray-600 py-2 hover:text-dark-purple font-semibold text-right">
              <EditIcon />
            </h3>
          </Link>
          <h3 className="p-6 space-y-6 col-span-2 text-center text-xl">
            Profile
          </h3>
          <div className="propertyNames pl-6 pb-6">
            <div>User:</div>
            <div>City:</div>
            <div>Email:</div>
          </div>
          <div className="properties pr-6 pb-6">
            <div>{localStorage.getItem("user")}</div>
            <div>
              {localStorage.getItem("city")
                ? localStorage.getItem("city")
                : "None"}
            </div>
            <div>{localStorage.getItem("email")} </div>
          </div>
          <div className="col-span-2 text-xl text-center">Reviews</div>
        </div>
        <div className="reviews">
          {reviews &&
            reviews.map((review) => (
              <UserReviewDetails
                key={review._id}
                review={review}
                fetchReviews={fetchReviews}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
