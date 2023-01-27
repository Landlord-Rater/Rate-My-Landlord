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
      <ModalProperty />

      <div className="reviews">
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        {/* <AddReview landlord={data.landlord} /> */}
      </div>
      <ModalReview />
      {/* <GetGeocode /> */}
      <div className="App">
        <br />
        <br />
        {!loadMap ? <div>Loading...</div> : <GMap props={data} />}
      </div>
    </div>
  );
};

export default LandlordPage;
