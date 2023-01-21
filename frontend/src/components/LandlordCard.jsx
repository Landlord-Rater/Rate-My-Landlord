//renders multiple of these upon search in home page if they fit search criteria

import React from 'react';
import { Link } from 'react-router-dom';
import House from '../assets/rundown house.jpeg'

const LandlordCard = ({ landlord }) => {

  return (
    <div className="landlordCards p-4 rounded-md bg-primary text-white grid grid-cols-3 gap-10">
      <img className="house object-fill col-span-1" src={House} alt="Logo" width="180"></img>
      <div className="landlordInfo col-span-2">
      <h4 className="font-bold text-xl">{landlord.name}</h4>
        <div className="location">
          <div className="font-medium">Location: </div>
          <p> {landlord.location}</p>
        </div>
        
        <div className="rating">
          <div className="font-medium mr-1">Rating: </div>
          {landlord.averageRating ? landlord.averageRating : 'N/A'}
        </div>
      </div>

      {/* <strong className="font-medium">Would Rent Again: </strong>
        {landlord.would_rent_again} */}

      <div className="flex justify-center col-span-2">
        <Link
          to="/landlord"
          state={{ landlord: landlord, from: 'LandlordCard' }}
          className="text-gray-800 text-md "
        >
          <button
            type="button"
            className="cursor-pointer w-full py-2 text-white hover:text-dark-purple "
          >
            See Landlord Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandlordCard;
