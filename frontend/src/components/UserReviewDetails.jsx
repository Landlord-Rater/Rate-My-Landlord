import React from 'react';

const UserReviewDetails = ({ review }) => {
  // console.log('review: ', review);
  /*The HTML Tags here are just placeholders so that way we could
ensure that we were getting the right informationa nd rendering it, 
so making it pretty and readable will be a whole other task in itself
*/

  return (
    <div className='review-details bg-secondary  p-4 rounded-md  text-gray-600 mb-3'>
      <p>
        <strong className='mr-1'>Name of Landlord:</strong>
        {review.name}
      </p>
      <p>
        <strong className='mr-1'>Location:</strong>
        {review.location}
      </p>
      <strong className='mr-1'>Rating:</strong>
      {review.rating}/5
      <p>{/* <strong className='mr-1'>Comments:</strong> */}</p>
      <strong className='mr-1'>Review:</strong>
      {review.text}
    </div>
  );
};

export default UserReviewDetails;
