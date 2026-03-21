import { ChangeEvent, FormEvent, Fragment } from 'react';
import { NewReview } from '../../types/review';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { setReviewForm } from '../../store/action';
import { ReviewText } from '../../enums';

type ReviewFormProps = {
  onSendReview: (formValue: NewReview) => void;
};

const MAX_RATING = 5;

function ReviewForm({ onSendReview }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isCommentSending = useAppSelector((state) => state.isCommentSending);
  const formValue = useAppSelector((state) => state.reviewForm);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const rating = Number(evt.target.value);
    dispatch(setReviewForm({ ...formValue, rating }));
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evt.target.value;
    dispatch(setReviewForm({ ...formValue, comment }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSendReview(formValue);
  };

  const isSubmitButtonDisabled = formValue.rating === 0 ||
      formValue.comment.length < ReviewText.MinLength ||
      isCommentSending;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
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
        value={formValue.comment}
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
