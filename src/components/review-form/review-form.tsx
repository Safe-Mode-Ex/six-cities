import { ChangeEvent, Fragment, useState } from 'react';
import { NewReview } from '../../types';
import { Rating, ReviewText } from '../../enums';
import { INITIAL_REVIEW_FORM_STATE } from '../../const';
import useReviewFormSubmit from '../../hooks/use-review-form-submit/use-review-form-submit';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const [formData, setReviewForm] = useState<NewReview>(INITIAL_REVIEW_FORM_STATE);
  const [isCommentSending, setCommentSending] = useState(false);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const rating = Number(evt.target.value);
    setReviewForm({ ...formData, rating });
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evt.target.value;
    setReviewForm({ ...formData, comment });
  };

  const handleFormSubmit = useReviewFormSubmit(offerId, formData, setReviewForm, setCommentSending);

  const isSubmitButtonDisabled = formData.rating === 0 ||
      formData.comment.length < ReviewText.MinLength ||
      isCommentSending;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
      data-testid="reviews-form"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: Rating.MaxValue }, (_, index) => {
          const ratingValue = Rating.MaxValue - index;

          return (
            <Fragment key={index}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={formData.rating === ratingValue}
                onChange={handleRatingChange}
                disabled={isCommentSending}
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
        value={formData.comment}
        onChange={handleTextChange}
        maxLength={ReviewText.MaxLength}
        disabled={isCommentSending}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span> and describe your stay with at least&nbsp;
          <b className="reviews__text-amount">{ReviewText.MinLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
