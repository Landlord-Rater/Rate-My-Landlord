//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandlordCard from "./LandlordCard.jsx";
import AddLandlord from "./AddLandlord.jsx";
import ModalLandlord from "./ModalLandlord.jsx";
import Container from "./Container.jsx";
import DropDownSearchBar from "./DropDownSearchBar.jsx";
import useDebounce from "../hooks/useDebounce.jsx";

const SearchPage = () => {
  const [landlords, setLandlords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [landlordsToRender, setLandlordsToRender] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // // custom debounce search hook to handle dynamic search input query
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLandlords([]);
      const results = await fetch(
        `/reviews/?search=${debouncedSearch.toLowerCase()}`
      );
      const data = await results.json();
      setLandlords(data);
      setLoading(false);
    };
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setLandlords([]);
  };

  return (
    <section class="bg-page search-page h-full p-4 bg-cover">

      <h1 className="text-center mb-40 text-3xl text-light-subtle">
        Rate My Landlord
      </h1>
      
      <Container>
        <div className="flex flex-row items-center justify-center">
          <DropDownSearchBar
            handleSearchQuery={handleSearchQuery}
            searchQuery={searchQuery}
            landlords={landlords}
          />
        </div>
        <div id="search-status">
          {/* {isLoading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )} */}

          <div className="results-status">
            {/* {landlords.length == 0 && searchQuery.length > 0 ? (
              <h2>Nothing Found!</h2>
            ) : null} */}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10 p-5">
          {/* {debouncedSearch.length > 0 &&
            landlords.map((landlord) => (
              <LandlordCard key={landlord.id} landlord={landlord} />
            ))} */}
        </div>



        <div className="flex flex-col items-center ">

        <ModalLandlord />

          {/* <Link to="/addlandlord" className="text-primary text-lg   ">
            <button
              type="button"
              // className="w-full rounded bg-secondary p-3 px-6 text-primary hover:text-dark-purple"
              className="w-full rounded bg-primary p-3 px-6 text-light"
            >
              Add New Landlord
            </button>
          </Link> */}

        </div>

      </Container>
    </section>
  );
};

export default SearchPage;
