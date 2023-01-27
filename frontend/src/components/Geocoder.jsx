import React from "react";
import axios from "axios";

const GetGeocode = async (location) => {
  let address = "4555 Strohm Ave";
  let city = "Toluca Lake";
  let state = "California";

  // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${"AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU"}`;
  let url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=4555+Strohm+Ave+Toluca+Lake+CA&key=AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU";
  const response = await axios.get(url);
  const data = response.data.results[0].geometry.location;

  //   console.log("lat and lng: ", data);
  const coords = {
    name: response.data.results[0].formatted_address,
    position: {
      lat: data.lat,
      lng: data.lng,
    },
  };
  //   console.log(coords);
  return coords;
};

console.log(GetGeocode());

export default GetGeocode;
