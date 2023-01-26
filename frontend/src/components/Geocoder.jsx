import React from "react";
import axios from "axios";

const GetGeocode = async (location) => {
  let address = "4555 Strohm Ave";
  let city = "Toluca Lake";
  let state = "California";
  //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

  // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${"AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU"}`;
  let url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=4555+Strohm+Ave+Toluca+Lake+CA&key=AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU";
  const response = await axios.get(url);
  //   const data = response.data;
  console.log(response.data.results[0].geometry.location);
  //   console.log("lat and lng: ", data.geometry.location.lat);
  //   const coords = {
  //     name: data.formatted_address,
  //     position: {
  //       lat: data.geometry.location.lat,
  //       lng: data.geometry.location.lng,
  //     },
  //   };
  //   console.log(coords);
  //   return coords;
};

console.log(GetGeocode());

export default GetGeocode;
