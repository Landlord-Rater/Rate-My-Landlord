import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddReview from "./AddReview.jsx";
import ReviewDetails from "./ReviewDetails.jsx";
import ModalReview from "./ModalReview.jsx";
import ModalProperty from "./ModalProperty.jsx";
import GMap from "./GoogleMaps.jsx";
import GetGeocode from "./Geocoder.jsx";

const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

const GOOGLE_MAP_API_KEY = "AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU";
//maps

const LandlordPage = () => {
  const location = useLocation();
  const { landlord, from } = location.state;

  const [data, setData] = useState({
    landlord: {},
    reviews: [],
    properties: {},
  }); // data.landlord, data.reviews

  useEffect(() => {
    if (from === "LandlordCard" || from === "SearchPage") {
      fetch("/landlords/" + landlord._id)
        .then((res) => res.json())
        .then((data) => setData(data));
      // .then(console.log("data in fetch", data));
    } else {
      setData({ landlord, properties });
    }
  }, []);

  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");

  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <div className=" review-page-container bg-no-repeat h-full bg-cover flex flex-col items-center py-3">

        <h1 className="page-title landlord-name py-4 col-span-2 text-center text-xl mt-8">
          {data.landlord.name}
        </h1>

      <div className="landlord-details-cols flex  flex-cols-2 w-11/12 -mx-2">

      <div className="page-column-1 w-1/2 px-2">

        <div className="demoInfogrid grid grid-cols-2 w-120 bg-primary text-white rounded text-l font-semibold ">

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

        <div className="button-container">
          <ModalProperty />

          <ModalReview />
        </div>

        <div className="reviews-container">
          {data.reviews &&
            data.reviews.map((review) => (
              <ReviewDetails key={review._id} review={review} />
            ))}
          {console.log(data.reviews)}

          {/* <AddReview landlord={data.landlord} /> */}
        </div>

      </div>{/* <-- end col 1 */}


      <div className="page-column-2 w-1/2 flex sm:block md:block">

        <div className="App google-map">
          {!loadMap ? <div>Loading...</div> : <GMap props={data} />}
        </div>

      </div>{/* <-- end col 2 */}

    </div>{/* <-- end columns */}


    </div>
  );
};

export default LandlordPage;
