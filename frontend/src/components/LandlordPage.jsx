import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddReview from "./AddReview.jsx";
import ReviewDetails from "./ReviewDetails.jsx";

const LandlordPage = () => {
  const location = useLocation();
  const { landlord, from } = location.state;

  const [data, setData] = useState({ landlord: {}, reviews: [] }); // data.landlord, data.reviews

  useEffect(() => {
    if (from === "LandlordCard") {
      fetch("/api/getlandlord/" + landlord._id)
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(console.log("data in fetch", data));
    } else {
      setData({ landlord });
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-2">
      <h2 className="page-title py-4">{data.landlord.name}</h2>

      <p className="label">
        {" "}
        Main City:
        {data.landlord.location}
      </p>

      <p className="label">
        Rating:
        {data.landlord.rating ? data.landlord.rating : "N/A"}
      </p>

      <p className="label label-rent-again mb-2">
        Would Rent Again:
        {data.landlord.would_rent_again
          ? data.landlord.would_rent_again
          : "N/A"}
      </p>

      <div className="reviews">
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        <AddReview landlord={data.landlord} />
      </div>
    </div>
  );
};

export default LandlordPage;
