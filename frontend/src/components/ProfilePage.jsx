import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails.jsx";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [reviews, setReviews] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch("/api/getuser/reviews/" + userID)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        console.log(data);
      });
    // console.log(users).then(console.log('data in fetch', users));
  }, []);

  return (
    <div className="flex flex-col items-center py-2">
      {/* <div class="object-none object-right bg-grey-300 w-24 h-24 "> */}
      Edit Profile
      <Link to="/editProfile">
        <h3 className="text-gray-600 py-2 hover:text-dark-purple font-semibold">
          <EditIcon />
        </h3>
      </Link>
      <h3 className="py-4">
        <strong>Profile</strong>
      </h3>
      <p>
        {console.log(localStorage.getItem("city"))}
        <strong>Username: {localStorage.getItem("user")}</strong>
      </p>
      <p>
        <strong>City: {localStorage.getItem("city")}</strong>
      </p>
      <p>
        <strong>Email: {localStorage.getItem("email")} </strong>
      </p>
      <p>
        <strong>Reviews: </strong>
      </p>
      <div className="reviews">
        {reviews &&
          reviews.map((review) => (
            <UserReviewDetails key={review._id} review={review} />
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
