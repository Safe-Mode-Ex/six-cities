import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { getFakeComments } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: Reviews', () => {
  const expectedHeadingText = /Reviews/i;
  const offerId = '1';
  const expectedReviewsMock = getFakeComments();
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
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
      .toBe(expectedReviewsMock.length.toString());
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
