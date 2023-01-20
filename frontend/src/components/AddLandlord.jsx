import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from './Container.jsx';
import FormSubmit from './FormSubmit.jsx';
import FormTitle from './FormTitle.jsx';
import FormInput from './FormInput.jsx';

export default function AddLandlord() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const landlord = { name, location };

    const response = await fetch('api/createlandlord', {
      method: 'POST',
      body: JSON.stringify(landlord), // { location: str, name: str }
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName('');
      setLocation('');
      setError(null);
      navigate('/landlord',{state:{landlord: json, from: 'AddLandlord'}});
    }
  };

  return (
    <div className="inset-0  flex justify-center items-center ">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}

        <form
          onSubmit={handleSubmit}
          className={' bg-white drop-shadow rounded p-6 space-y-6 w-80'}
        >
          <FormTitle>Add New Landlord</FormTitle>
          <FormInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Landlord Name"
            placeholder="_"
            name="name"
          />
          <FormInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            placeholder="_"
            name="location"
            type="text"
          />
          <FormSubmit value="Submit" />
        </form>
      </Container>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
