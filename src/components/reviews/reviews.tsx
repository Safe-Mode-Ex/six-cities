import { useAppSelector } from '../../hooks/use-app-selector';
import { selectAuthorizedStatus } from '../../store/user-process/selector';
import { Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review/review';

type ReviewsProps = {
  offerId: string;
  reviews: Review[];
}

function Reviews({offerId, reviews}: ReviewsProps): JSX.Element {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list" data-testid="reviews-list">
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
