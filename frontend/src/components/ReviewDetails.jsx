import React from 'react';

const ReviewDetails = ({ review }) => {
  // console.log('review: ', review);
  /*The HTML Tags here are just placeholders so that way we could
ensure that we were getting the right informationa nd rendering it,
so making it pretty and readable will be a whole other task in itself
*/

  return (
    <div className='review-details bg-secondary  p-4 rounded-md  text-gray-600 mb-3'>
      <p className='label mr-1'>
        Rating:
        {review.rating}/5
      </p>
      <p className='label mr-1'>
        Would Rent Again:
        {review.would_rent_again > 0 ? '✓' : '𐄂'}{' '}
      </p>
      <p>Date: {review.date}</p>
      <p className='label mr-1'>Comments:</p>
      <p>{review.text}</p>
    </div>
  );
};

export default ReviewDetails;
