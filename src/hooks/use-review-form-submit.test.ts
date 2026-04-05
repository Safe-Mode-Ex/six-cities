import { renderHook } from '@testing-library/react';
import useReviewFormSubmit from './use-review-form-submit';
import { INITIAL_REVIEW_FORM_STATE } from '../const';

const mocks = vi.hoisted(() => ({
  setReviewForm: vi.fn(),
  setCommentSending: vi.fn(),
  dispatchMock: vi.fn(() => Promise.resolve()),
  sendOfferReviewAction: vi.fn(),
}));

vi.mock('./use-app-selector', () => ({
  useAppDispatch: () => mocks.dispatchMock,
}));
vi.mock('../store/api-actions', () => ({
  sendOfferReviewAction: mocks.sendOfferReviewAction,
}));

describe('Hook: useReviewFormSubmit', () => {
  let offerId: string;
  let formData: {
      rating: number;
      comment: string;
    };
  let eventMock: React.FormEvent<HTMLFormElement>;

  beforeEach(() => {
    offerId = '1';
    formData = {
      rating: 5,
      comment: 'Great place!',
    };
    eventMock = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;
  });

  afterAll(() => {
    mocks.setReviewForm.mockReset();
    mocks.setCommentSending.mockReset();
    mocks.dispatchMock.mockReset();
    mocks.sendOfferReviewAction.mockReset();
  });

  it('should submit the review form and dispatch the appropriate actions', () => {
    const { result } = renderHook(() =>
      useReviewFormSubmit(offerId, formData, mocks.setReviewForm, mocks.setCommentSending)
    );
    result.current(eventMock);

    expect(mocks.setCommentSending).toHaveBeenCalledWith(true);
    expect(mocks.sendOfferReviewAction).toHaveBeenCalledWith({
      offerId,
      formData,
    });
  });

  it('should set review form to initial state and set comment sending to false on dispatch success',
    () => {
      const { result } = renderHook(() =>
        useReviewFormSubmit(offerId, formData, mocks.setReviewForm, mocks.setCommentSending)
      );
      result.current(eventMock);

      mocks.dispatchMock().then(() => {
        expect(mocks.setReviewForm).toHaveBeenCalledWith(INITIAL_REVIEW_FORM_STATE);
        expect(mocks.setCommentSending).toHaveBeenCalledWith(false);
      });
    });

  it('should set comment sending to false on dispatch failure', () => {


    mocks.dispatchMock.mockImplementationOnce((): Promise<void> => Promise.reject());

    const { result } = renderHook(() =>
      useReviewFormSubmit(offerId, formData, mocks.setReviewForm, mocks.setCommentSending)
    );
    result.current(eventMock);

    mocks.dispatchMock().catch(() => {
      expect(mocks.setCommentSending).toHaveBeenCalledWith(false);
    });
  });
});
