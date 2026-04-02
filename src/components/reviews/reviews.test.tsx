import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { getFakeComments } from '../../utils/mocks';

const mocks = vi.hoisted(() => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: mocks.useAppSelector,
}));

describe('Component: Reviews', () => {
  const expectedHeadingText = /Reviews/i;
  const offerId = '1';
  const expectedReviewsMock = getFakeComments();

  it('should render properly', () => {
    render(<Reviews offerId={offerId} reviews={expectedReviewsMock} />);
    const headingText = screen.getByText(expectedHeadingText);

    expect(headingText).toBeInTheDocument();
    expect(headingText.getElementsByClassName('reviews__amount')[0].textContent)
      .toBe(expectedReviewsMock.length.toString());
  });

  it('should render reviews list', () => {
    const reviewsListTestId = 'reviews-list';

    render(<Reviews offerId={offerId} reviews={expectedReviewsMock} />);
    const reviewsList = screen.getByTestId(reviewsListTestId);

    expect(reviewsList).toBeInTheDocument();
    expect(reviewsList.getElementsByTagName('li').length).toBe(expectedReviewsMock.length);
  });

  it('should render ReviewForm if user is authorized', () => {
    const reviewFormTestId = 'reviews-form';

    mocks.useAppSelector.mockReturnValue(true);
    render(<Reviews offerId={offerId} reviews={expectedReviewsMock} />);

    expect(screen.getByTestId(reviewFormTestId)).toBeInTheDocument();
  });

  it('should not render ReviewForm if user is not authorized', () => {
    const reviewFormTestId = 'reviews-form';

    mocks.useAppSelector.mockReturnValue(false);
    render(<Reviews offerId={offerId} reviews={expectedReviewsMock} />);

    expect(screen.queryByTestId(reviewFormTestId)).not.toBeInTheDocument();
  });
});
