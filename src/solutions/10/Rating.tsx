import clsx from 'clsx';
import { useState } from 'react';

import { StarIcon } from './assets/StartIcon';

interface RatingProps {
  defaultRating?: number;
}

export const Rating = ({ defaultRating = 0 }: RatingProps) => {
  const [rating, setRating] = useState(defaultRating);

  return (
    <div
      className="rating-root"
      style={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '4px',
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={clsx('rating-star', {
            'rating-star-active': index < rating,
          })}
          style={{
            padding: 0,
            border: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => setRating(index + 1)}
        >
          <StarIcon
            fill={index < rating ? '#ED8A19' : '#e0e0e0'}
            style={{ width: '20px', height: '20px' }}
          />
        </button>
      ))}
    </div>
  );
};
