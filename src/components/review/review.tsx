import { ISO_DATE_TIME_DIVIDER } from '../../const';
import { Rating } from '../../enums';
import { Review } from '../../types/review';

type ReviewProps = {
    review: Review;
}

const LOCALE = 'en-US';

function ReviewItem({ review }: ReviewProps) {
  const date = new Date(review.date);
  const dateTime = review.date.split(ISO_DATE_TIME_DIVIDER)[0];
  const starsFillingWidth = `${review.rating * Rating.StarsWidth}%`;

  const formattedDate = new Intl.DateTimeFormat(LOCALE, {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return (
    <li className="reviews__item" key={review.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
            data-testid="user-avatar"
          />
        </div>
        <span className="reviews__user-name" data-testid="user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: starsFillingWidth}} data-testid="rating-stars"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" data-testid="review-text">{review.comment}</p>
        <time
          className="reviews__time"
          dateTime={dateTime}
          data-testid="review-time"
        >{formattedDate}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
