//renders multiple of these upon search in home page if they fit search criteria
import React from "react";
import { Link } from "react-router-dom";
import House from "../assets/rundown house.jpeg";

const LandlordCard = ({ landlord }) => {
  return (
    <div className="landlordCards p-4 rounded-md bg-primary text-white grid grid-cols-3 grid-rows-3 gap-x-10 gap-y-1">
      <img
        className="house object-fill col-span-1 row-span-2"
        src={House}
        alt="Logo"
        width="200"
      />

        <h2 className="landlord-name font-bold text-xl col-span-2 row-span-1">{landlord.name ? landlord.name : "Name not specified"}</h2>

        <div className="labels col-span-1 row-span-1">
          <div className="label font-medium">Location: </div>
          <div className="label font-medium mr-1">Rating: </div>
        </div>

        <div className="values col-span-1 row-span-1">
          <div className="info"> {landlord.location}</div>
          <div className="info font-medium mr-1">
            {landlord.averageRating ? landlord.averageRating : "N/A"}
          </div>
        </div>

      {/* <strong className="font-medium">Would Rent Again: </strong>
        {landlord.would_rent_again} */}

      <div className="landlord-reviews-link-container flex justify-center col-span-3 row-span-1">
        <Link
          to="/landlord"
          state={{ landlord: landlord, from: "LandlordCard" }}
          className="w-60 h-10 rounded bg-secondary text-primary hover:bg-opacity-90 hover:text-dark-purple transition font-semibold text-lg cursor-pointer p-1 text-center mt-3 "
        >
          <button
            type="button"
            className=""
          >
            See Landlord Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandlordCard;
