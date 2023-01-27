import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandlordCard from "./LandlordCard.jsx";
import AddLandlord from "./AddLandlord.jsx";
import Container from "./Container.jsx";
import DropDown from "./DropDown.jsx";
import SearchListItem from "./SearchListItem.jsx";
import useDebounce from "../hooks/useDebounce.jsx";

const DropDownSearchBar = ({ handleSearchQuery, searchQuery, landlords }) => {
  return (
    <div className="w-1/2 flex relative">
      <div className="absolute -right-10 -top-9 z-20">
        <DropDown />
      </div>

      <div className="inline-flex flex-col justify-center relative text-gray-500 w-full">
        <div className="">
          <input
            type="text"
            //   className="bg-transparent rounded border-4 border-slate-300 hover:border-light-subtle focus:border-light-subtle w-full text-lg outline-none p-1 dark:text-black peer transition basis-1/2"
            className="p-2 pl-8 rounded border-3 border-gray-200 bg-gray-200 w-full focus:bg-white hover:bg-white focus:outline-none focus:ring-1  focus:border-transparent text-lg"
            placeholder="search..."
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e)}
          />
          <svg
            class="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <ul class="bg-white border border-gray-100 w-full mt-2 ">
          {landlords.map((landlord) => (
            <SearchListItem key={landlord.id} landlord={landlord} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownSearchBar;
