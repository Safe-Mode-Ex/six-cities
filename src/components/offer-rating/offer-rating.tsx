import { memo } from 'react';
import { Rating } from '../../enums';

type OfferRatingProps = {
    rating: number;
}

function OfferRating({ rating }: OfferRatingProps): JSX.Element {
  const starsFillingWidth = `${Math.round(rating) * Rating.StarsWidth}%`;

  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{width: starsFillingWidth}} data-testid="stars-value"></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value" data-testid="rating-value">{rating}</span>
    </div>
  );
}

const MemoizedOfferRating = memo(OfferRating);

export default MemoizedOfferRating;
