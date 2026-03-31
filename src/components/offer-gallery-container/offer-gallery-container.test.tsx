import { render, screen } from '@testing-library/react';
import MemoizedOfferGalleryContainer from './offer-gallery-container';

describe('Component: Offer Gallery Container', () => {
  it('should render properly', () => {
    const expectedImages = [''];
    const imagesContainerId = 'images-container';
    const offerImageId = 'offer-image';

    render(<MemoizedOfferGalleryContainer images={expectedImages} />);
    const imagesContainer = screen.getByTestId(imagesContainerId);
    const offerImages = screen.getAllByTestId(offerImageId);

    expect(imagesContainer).toBeInTheDocument();
    expect(offerImages.length).toBe(expectedImages.length);
  });
});
