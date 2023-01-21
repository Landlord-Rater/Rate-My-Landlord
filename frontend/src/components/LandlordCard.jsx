//renders multiple of these upon search in home page if they fit search criteria
import React from "react";
import { Link } from "react-router-dom";
import House from "../assets/rundown house.jpeg";

const LandlordCard = ({ landlord }) => {
  return (
    <div className="landlordCards p-4 rounded-md bg-primary text-white grid grid-cols-3 gap-10">
      <img
        className="house object-fill col-span-1"
        src={House}
        alt="Logo"
        width="180"
      />

      <div className="landlord-info col-span-2">
        <h2 className="landlord-name font-bold text-xl">{landlord.name}</h2>

        <div className="landlord-location">
          <div className="label font-medium">Location: </div>
          <div className="info"> {landlord.location}</div>
        </div>

        <div className="landlord-rating">
          <div className="label font-medium mr-1">Rating: </div>
          <div className="info font-medium mr-1">
            {landlord.averageRating ? landlord.averageRating : "N/A"}
          </div>
        </div>
      </div>

      {/* <strong className="font-medium">Would Rent Again: </strong>
        {landlord.would_rent_again} */}

      <div className="landlord-reviews-link-container flex justify-center col-span-2">
        <Link
          to="/landlord"
          state={{ landlord: landlord, from: "LandlordCard" }}
          className="landlord-reviews-link text-gray-800 text-md "
        >
          <button
            type="button"
            className="landlord-reviews-link-button cursor-pointer w-full py-2 text-white hover:text-dark-purple "
          >
            See Landlord Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandlordCard;
