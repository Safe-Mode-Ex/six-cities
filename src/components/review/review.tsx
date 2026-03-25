import { Rating } from '../../enums';
import { Review } from '../../types/review';

type ReviewProps = {
    review: Review;
}

const ISO_DATE_TIME_DIVIDER = 'T';
const LOCALE = 'en-US';

function ReviewItem({ review }: ReviewProps) {
  const date = new Date(review.date);
  const dateTime = date.toISOString().split(ISO_DATE_TIME_DIVIDER)[0];

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
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * Rating.StarsWidth}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateTime}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
