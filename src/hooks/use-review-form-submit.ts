import { FormEvent } from 'react';
import { INITIAL_REVIEW_FORM_SATE } from '../const';
import { sendOfferReviewAction } from '../store/api-actions';
import { NewReview } from '../types/review';
import { useAppDispatch } from './use-app-selector';

function useReviewFormSubmit(
  offerId: string,
  formData: NewReview,
  setReviewForm: React.Dispatch<React.SetStateAction<NewReview>>,
  setCommentSending: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();

  return (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setCommentSending(true);
    dispatch(sendOfferReviewAction({
      offerId,
      formData,
    })).then(() => {
      setReviewForm(INITIAL_REVIEW_FORM_SATE);
      setCommentSending(false);
    }, () => {
      setCommentSending(false);
    });
  };
}

export default useReviewFormSubmit;
