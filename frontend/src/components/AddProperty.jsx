import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";

export default function AddProperty() {
  const location = useLocation();
  const { landlord, from } = location.state;
  const [landlord_id, setId] = useState(landlord._id);

  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const property = {
      streetNumber,
      streetName,
      city,
      state,
      zip,
      landlord_id,
    };
    const response = await fetch("/properties/", {
      method: "POST",
      body: JSON.stringify(property), // { location: str, name: str }
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setStreetNumber("");
      setStreetName("");
      setCity("");
      setState("");
      setZip("");
      setError(null);
      navigate("/landlord", { state: { landlord: json, from: "AddLandlord" } });
    }
  };

  return (
    <div className="inset-0  flex justify-center items-center ">
      <Container>
        <form
          onSubmit={handleSubmit}
          className={" bg-primary drop-shadow rounded p-6 space-y-6 w-80 mt-5"}
        >
          <FormTitle>Add New Landlord</FormTitle>
          <FormInput
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            label="Street Number"
            placeholder="Enter Street Number"
            name="streetNumber"
          />
          <FormInput
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            label="Street Name"
            placeholder="Enter Street Name"
            name="streetName"
            type="text"
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
