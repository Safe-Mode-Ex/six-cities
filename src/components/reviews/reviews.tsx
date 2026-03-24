import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/selector';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review/review';

type ReviewsProps = {
  offerId: string;
  reviews: Review[];
}

function Reviews({offerId, reviews}: ReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      {isAuthorized && (
        <ReviewForm offerId={offerId} />
      )}
    </section>
  );
}

export default Reviews;
