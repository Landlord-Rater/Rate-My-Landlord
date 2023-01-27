import React from "react";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const SearchListItem = ({ landlord }) => {
  return (
    <Link to="/landlord" state={{ landlord: landlord, from: "SearchPage" }}>
      <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
        <PersonOutlineIcon className=" absolute  left-1" />
        <b>{landlord.name.slice(0, 3)}</b>
        {landlord.name.slice(3)} - {landlord.location}
      </li>
    </Link>
  );
};

export default SearchListItem;
