//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandlordCard from "./LandlordCard.jsx";
import AddLandlord from "./AddLandlord.jsx";
import Container from "./Container.jsx";

const SearchPage = () => {
  const [landlords, setLandlords] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [landlordsToRender, setLandlordsToRender] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/reviews/")
      .then((res) => res.json())
      .then((json) => setLandlords(json))
      .then(() => {
        const loaderElement = document.querySelector(".loader-container");
        if (loaderElement) {
          loaderElement.remove();
          setLoading(!isLoading);
        }
      });
  }, []);

  useEffect(() => {
    setLandlordsToRender(
      landlords.filter(
        (landlord) =>
          landlord.name.toLowerCase().includes(searchBar.toLowerCase()) ||
          landlord.location.toLowerCase().includes(searchBar.toLowerCase())
      )
    );
  }, [searchBar, landlords]);

  console.log("render", landlordsToRender);
  console.log("search", searchBar);

  /* NEED TO HANDLE IF THERE ARE NO LANDLORDS WITH THAT NAME OR CITY AND ALSO EMPTY SEARCH BAR*/

  // if (isLoading) {
  //   return null;
  // }

  return (
    <section>
      <Container>
        <div className="flex flex-row items-center justify-center mt-4">
          <input
            type="text"
            onChange={(e) => setSearchBar(e.target.value)}
            value={searchBar}
            className="bg-transparent rounded border-2 border-slate-300 focus:border-dark-purple w-full text-lg outline-none p-1 dark:text-black peer transition basis-1/2"
            placeholder="Search"
          />
        </div>

        <div id="search-status">
          <div className="loader-container">
            <div className="loader"></div>
          </div>

          <div className="results-status">
            {landlordsToRender.length == 0 && isLoading == false ? (
              <h2>Nothing Found!</h2>
            ) : null}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10 p-5">
          {landlordsToRender.map((landlord) => (
            <LandlordCard key={landlord.id} landlord={landlord} />
          ))}
        </div>

        <div className="flex flex-col items-center ">
          <Link to="/addlandlord" className="text-primary text-lg   ">
            <button
              type="button"
              className="w-full rounded bg-secondary p-3 px-6 text-primary hover:text-dark-purple"
            >
              Add New Landlord
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default SearchPage;
