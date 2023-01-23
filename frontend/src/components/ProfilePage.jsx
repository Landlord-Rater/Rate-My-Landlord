import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  //   const { landlord, from } = location.state;

  //const [data, setData] = useState({ landlord: {}, reviews: [] }); // data.landlord, data.reviews
  const data = ["hello", "another rating"];
  //   useEffect(() => {
  //     if (from === 'LandlordCard') {
  //       fetch('/api/getlandlord/' + landlord._id)
  //         .then((res) => res.json())
  //         .then((data) => setData(data))
  //         .then(console.log('data in fetch', data));
  //     } else {
  //       setData({ landlord });
  //     }
  //   }, []);

  return (
    <div className="centeringBox inset-0 flex flex-col justify-center items-center mt-5" >
      <div className="profileContainer grid grid-cols-2 w-80 bg-primary text-white rounded-md text-l font-semibold ">
        <h3 className="p-6 space-y-6 col-span-2 text-center text-xl">
           Profile
        </h3>
        <div className="propertyNames p-6">
          <div>First Name:</div>
          <div>Last Name:</div>
          <div>City:</div>
          <div>Email:</div>
          <div>Reviews:</div>
        </div>
        <div className="properties p-6"></div>
      </div>
      {/* <div className='reviews'>Hello</div> */}
      {/* <h3 className='py-4'>
        <strong>{data.landlord.name}</strong>
      </h3>
      <h2>
        <strong>Main City: </strong>
        {data.landlord.location}
      </h2>
      <p>
        <strong>Rating: </strong>
        {data.landlord.rating ? data.landlord.rating : 'N/A'}
      </p>
      <p className='mb-2'>
        <strong>Would Rent Again: </strong>
        {data.landlord.would_rent_again
          ? data.landlord.would_rent_again
          : 'N/A'}
      </p>
      <div className='reviews'>
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        <AddReview landlord={data.landlord} />
      </div> */}</div>
  );
};

export default ProfilePage;
