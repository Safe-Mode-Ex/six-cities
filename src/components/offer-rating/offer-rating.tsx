import { memo } from 'react';
import { Rating } from '../../enums';

type OfferRatingProps = {
    rating: number;
}

function OfferRating({ rating }: OfferRatingProps): JSX.Element {
  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{width: `${Math.round(rating) * Rating.StarsWidth}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{rating}</span>
    </div>
  );
}

const MemoizedOfferRating = memo(OfferRating);

export default MemoizedOfferRating;
