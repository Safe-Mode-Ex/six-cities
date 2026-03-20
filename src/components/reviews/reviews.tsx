import { useAppSelector } from '../../hooks/use-app-selector';
import { AuthorizationStatus } from '../../types/authorization-status';
import { NewReview, Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review/review';

type ReviewsProps = {
  reviews: Review[];
  reviewMinLength: number;
  reviewMaxLength: number;
}

function Reviews({reviews, reviewMinLength, reviewMaxLength}: ReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleSendReview = (formValue: NewReview): void => {
    console.log(formValue);
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
        <ReviewForm
          reviewMinLength={reviewMinLength}
          reviewMaxLength={reviewMaxLength}
          onSendReview={handleSendReview}
        />
      )}
    </section>
  );
}

export default Reviews;
