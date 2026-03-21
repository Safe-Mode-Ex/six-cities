import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { sendOfferReview } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/authorization-status';
import { NewReview, Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review/review';

type ReviewsProps = {
  offerId: string;
  reviews: Review[];
}

function Reviews({offerId, reviews}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleSendReview = (formData: NewReview): void => {
    dispatch(sendOfferReview({
      offerId,
      formData,
    }));
  };

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
        <ReviewForm onSendReview={handleSendReview} />
      )}
    </section>
  );
}

export default Reviews;
