import { render, screen } from '@testing-library/react';
import { Rating } from '../../enums';
import { getFakeReviews } from '../../utils/mocks';
import Review from './review';
import { ISO_DATE_TIME_DIVIDER } from '../../const';

describe('Component: Review', () => {
  it('should render properly', () => {
    const expectedReview = getFakeReviews()[0];
    const userAvatarId = 'user-avatar';
    const userNameId = 'user-name';
    const ratingStarsId = 'rating-stars';
    const starsFillingWidth = `${expectedReview.rating * Rating.StarsWidth}%`;
    const reviewTextId = 'review-text';
    const reviewTimeId = 'review-time';
    const dateTime = expectedReview.date.split(ISO_DATE_TIME_DIVIDER)[0];

    render(<Review review={expectedReview} />);
    const userAvatar = screen.getByTestId(userAvatarId);
    const userName = screen.getByTestId(userNameId);
    const ratingStars = screen.getByTestId(ratingStarsId);
    const reviewText = screen.getByTestId(reviewTextId);
    const reviewTime = screen.getByTestId(reviewTimeId);

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar.getAttribute('src')).toBe(expectedReview.user.avatarUrl);
    expect(userName).toBeInTheDocument();
    expect(userName.textContent).toBe(expectedReview.user.name);
    expect(ratingStars).toBeInTheDocument();
    expect(ratingStars.style.width).toBe(starsFillingWidth);
    expect(reviewText).toBeInTheDocument();
    expect(reviewText.textContent).toBe(expectedReview.comment);
    expect(reviewTime).toBeInTheDocument();
    expect(reviewTime.getAttribute('dateTime')).toBe(dateTime);
  });
});
