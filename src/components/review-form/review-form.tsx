import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { NewReview } from '../../types/review.type';

type ReviewFormProps = {
  reviewMinLength: number;
  reviewMaxLength: number;
  onSendReview: (formValue: NewReview) => void;
};

const MAX_RATING = 5;

function ReviewForm({ reviewMinLength, reviewMaxLength, onSendReview }: ReviewFormProps): JSX.Element {
  const [formValue, setFormValue] = useState({
    rating: 0,
    text: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const rating = Number(evt.target.value);
    setFormValue((prev) => ({ ...prev, rating }));
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const text = evt.target.value;
    setFormValue((prev) => ({ ...prev, text }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSendReview(formValue);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: MAX_RATING }, (_, index) => {
          const ratingValue = MAX_RATING - index;

          return (
            <Fragment key={index}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={formValue.rating === ratingValue}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`${ratingValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formValue.text}
        onChange={handleTextChange}
        maxLength={reviewMaxLength}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount">{reviewMinLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formValue.rating === 0 || formValue.text.length < reviewMinLength}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
