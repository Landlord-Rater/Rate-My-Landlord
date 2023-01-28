import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const res = await fetch("/landlords/cities");
      const data = await res.json();
      console.log("cities", data);
      setCities(data);
    };
    fetchCities();
  }, []);

  return (
    <div class="p-10">
      <div class="dropdown inline-block relative">
        <button class="text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
          <span class="mr-1">Select City</span>
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
          </svg>
        </button>
        <ul class="dropdown-menu absolute hidden pt-1 text-gray-700 w-33 max-h-52 overflow-y-auto">
          {cities.map((city) => {
            return (
              <Link to={`/landlord/reviews/${city}`}>
                <li
                  class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block
                  whitespace-no-wrap"
                >
                  {city}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
