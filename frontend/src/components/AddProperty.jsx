import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { LandlordPageContext } from "./LandlordPage.jsx";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import axios from "axios";

export default function AddProperty() {
  const location = useLocation();
  const { landlord, from } = location.state;
  const [landlord_id, setId] = useState(landlord._id);
  const { handleAddressSubmit } = useContext(LandlordPageContext);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let streetGeo = streetAddress.replaceAll(" ", "+");
    let cityGeo = city.replaceAll(" ", "+");
    let stateGeo = state.replaceAll(" ", "+");

    // let url =https://maps.googleapis.com/maps/api/geocode/json?address=4555+Strohm+Ave+Toluca+Lake+CA&key=AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${"AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU"}`;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${streetGeo}+${cityGeo}+${stateGeo}&key=AIzaSyCkw38xDOVL1HphHAlzLUAqQL1lSqMQ3bU`;
    const response = await axios.get(url);
    const data = response.data.results[0].geometry.location;
    const lat = data.lat;
    const lng = data.lng;

    const property = {
      streetAddress,
      city,
      state,
      zip,
      landlord_id,
      lat,
      lng,
    };

    const responseProp = await fetch("/properties/", {
      method: "POST",
      body: JSON.stringify(property), // { location: str, name: str }
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await responseProp.json();
    handleAddressSubmit();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setStreetAddress("");
      setCity("");
      setState("");
      setZip("");
      setError(null);
      navigate("/landlord", {
        state: { landlord: json, from: "AddLandlord" },
      });
    }
  };

  return (
    <div className="inset-0 flex justify-center items-center ">
      <Container>
        <form
          onSubmit={handleSubmit}
          className={" bg-primary drop-shadow rounded p-6 space-y-6 w-80 mt-5"}
        >
          {/* <FormTitle>Add New Property</FormTitle> */}
          <FormInput
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            label="Street Address"
            placeholder="Enter Street Address"
            name="streetAddress"
          />
          <FormInput
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            placeholder="Enter City"
            name="city"
          />
          <FormInput
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="State"
            placeholder="Enter State"
            name="name"
          />
          <FormInput
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            label="Zip"
            placeholder="Enter Zip"
            name="zip"
          />
          <FormSubmit value="Submit" />
        </form>
      </Container>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
