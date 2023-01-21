import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const [reviews, setReviews] = useState([]);
  //   const [data, setData] = useState({ user: {}, reviews: [] }); // data.landlord, data.reviews
  useEffect(() => {
    fetch('/api/getuser/success')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        // console.log(data);
      });
    // console.log(users).then(console.log('data in fetch', users));
  }, []);

  return (
    <div className='flex flex-col items-center py-2'>
      <h3 className='py-4'>
        <strong>Profile</strong>
      </h3>
      <p>
        <strong>Username: {localStorage.getItem('user')}</strong>
      </p>
      <p>
        <strong>City: </strong>
      </p>
      <p>
        <strong>Email: {localStorage.getItem('email')} </strong>
      </p>
      <p>
        <strong>Reviews: </strong>
      </p>
    </div>
  );
};

export default ProfilePage;
