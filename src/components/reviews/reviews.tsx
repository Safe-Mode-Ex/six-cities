import { REVIEWS } from '../../mocks/reviews';
import { NewReview } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review/review';

type ReviewsProps = {
  reviewMinLength: number;
  reviewMaxLength: number;
}

function Reviews({reviewMinLength, reviewMaxLength}: ReviewsProps): JSX.Element {
  const handleSendReview = (formValue: NewReview): void => {
    console.log(formValue);
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {REVIEWS.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      <ReviewForm
        reviewMinLength={reviewMinLength}
        reviewMaxLength={reviewMaxLength}
        onSendReview={handleSendReview}
      />
    </section>
  );
}

export default Reviews;
