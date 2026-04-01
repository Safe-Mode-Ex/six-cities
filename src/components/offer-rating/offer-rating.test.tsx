import { render, screen } from '@testing-library/react';
import MemoizedOfferRating from './offer-rating';
import { Rating } from '../../enums';

describe('Component: Offer Rating', () => {
  it('should render properly', () => {
    const expectedRating = 3.5;
    const starsFillingWidth = `${Math.round(expectedRating) * Rating.StarsWidth}%`;
    const starsValueId = 'stars-value';
    const ratingValueId = 'rating-value';

    render(<MemoizedOfferRating rating={expectedRating} />);
    const starsValue = screen.getByTestId(starsValueId);
    const ratingValue = screen.getByTestId(ratingValueId);

    expect(starsValue).toBeInTheDocument();
    expect(starsValue.style.width).toBe(starsFillingWidth);
    expect(ratingValue).toBeInTheDocument();
    expect(ratingValue.textContent).toBe(String(expectedRating));
  });
});
