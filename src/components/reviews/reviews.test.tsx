import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { getFakeComments } from '../../utils';
import { withStore } from '../../utils';
import { NameSpace, OfferDetailsMaxCount } from '../../enums';
import { AuthorizationStatus } from '../../types';

describe('Component: Reviews', () => {
  const expectedHeadingText = /Reviews/i;
  const offerId = '1';
  const expectedReviewsMock = getFakeComments().slice(0, OfferDetailsMaxCount.Reviews);
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    },
    [NameSpace.Offer]: {
      offerDetails: null,
      offerReviews: getFakeComments(),
      nearbyOffers: [],
    }
  };
  const { withStoreComponent } = withStore(
    <Reviews offerId={offerId} reviews={expectedReviewsMock}/>,
    state,
  );

  it('should render properly', () => {
    render(withStoreComponent);
    const headingText = screen.getByText(expectedHeadingText);

    expect(headingText).toBeInTheDocument();
    expect(headingText.getElementsByClassName('reviews__amount')[0].textContent)
      .toBe(state[NameSpace.Offer].offerReviews.length.toString());
  });

  it('should render reviews list', () => {
    const reviewsListTestId = 'reviews-list';

    render(withStoreComponent);
    const reviewsList = screen.getByTestId(reviewsListTestId);

    expect(reviewsList).toBeInTheDocument();
    expect(reviewsList.getElementsByTagName('li').length).toBe(expectedReviewsMock.length);
  });

  it('should render ReviewForm if user is authorized', () => {
    const reviewFormTestId = 'reviews-form';
    state[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;

    render(withStoreComponent);

    expect(screen.getByTestId(reviewFormTestId)).toBeInTheDocument();
  });

  it('should not render ReviewForm if user is not authorized', () => {
    const reviewFormTestId = 'reviews-form';
    state[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

    render(withStoreComponent);

    expect(screen.queryByTestId(reviewFormTestId)).not.toBeInTheDocument();
  });
});
