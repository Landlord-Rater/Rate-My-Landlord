import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddReview from "./AddReview.jsx";
import ReviewDetails from "./ReviewDetails.jsx";
import ModalReview from "./ModalReview.jsx";

const LandlordPage = () => {
  const location = useLocation();
  const { landlord, from } = location.state;

  const [data, setData] = useState({ landlord: {}, reviews: [] }); // data.landlord, data.reviews

  useEffect(() => {
    if (from === "LandlordCard") {
      fetch("/landlords/" + landlord._id)
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(console.log("data in fetch", data));
    } else {
      setData({ landlord });
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-2 mt-5">
      <div className="demoInfogrid grid grid-cols-2 w-80 bg-primary text-white rounded text-l font-semibold ">
        <h2 className="page-title py-4 col-span-2 text-center text-xl ">
          {data.landlord.name}
        </h2>
        <div className="labelsColumn pl-6 p-6 col-span-1">
          <div className="label">Main City:</div>
          <div className="label">Rating:</div>
          <div className="label label-rent-again mb-2">Would Rent Again:</div>
        </div>
        <div className="valuesColumn p-6 col-span-1">
          <div>{data.landlord.location}</div>
          <div>{data.landlord.rating ? data.landlord.rating : "N/A"}</div>
          <div>
            {data.landlord.would_rent_again
              ? data.landlord.would_rent_again
              : "N/A"}
          </div>
        </div>
      </div>
      <div className="reviews">
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        {/* <AddReview landlord={data.landlord} /> */}
      </div>

      <ModalReview />
    </div>
  );
};

export default LandlordPage;
