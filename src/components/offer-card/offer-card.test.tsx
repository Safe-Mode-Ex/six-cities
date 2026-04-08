import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../utils';
import MemoizedOfferCard from './offer-card';
import { withHistory, withStore } from '../../utils';
import { NameSpace, PlaceImageSize } from '../../enums';
import { AuthorizationStatus } from '../../types';
import userEvent from '@testing-library/user-event';
import { getStarsFillingWith } from '../../utils/helpers';

describe('Component: OfferCard', () => {
  const stateMock = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
    }
  };
  const offerCardTestId = 'offer-card';
  const cardImageWrapperTestId = 'card-image-wrapper';
  const placeImageAltText = /Place image/i;
  const offerCardDataMock = getFakeOffers()[0];
  const onHoverMock = vi.fn();
  const withStoreCallable = (isFavoritesScreen = false, isOfferScreen = false) => withStore(
    <MemoizedOfferCard
      offer={offerCardDataMock}
      onHover={onHoverMock}
      isFavoritesScreen={isFavoritesScreen}
      isOfferScreen={isOfferScreen}
    />,
    stateMock,
  );
  const withHistoryComponent = (isFavoritesScreen = false, isOfferScreen = false) => {
    const { withStoreComponent } = withStoreCallable(isFavoritesScreen, isOfferScreen);
    return withHistory(withStoreComponent);
  };

  it('should render properly', () => {
    const premiumText = /Premium/i;
    const toBookmarksText = /To bookmarks/i;
    const ratingText = /Rating/i;
    const priceText = /\/ night/i;
    const offerPriceTestId = 'offer-price';
    const bookmarkButtonTestId = 'bookmark-button';
    const ratingStarsTestId = 'rating-stars';
    const cardNameTestId = 'card-name';
    const offerTypeTestId = 'offer-type';

    render(withHistoryComponent());

    expect(screen.getByText(premiumText)).toBeInTheDocument();
    expect(screen.getByAltText(placeImageAltText)).toBeInTheDocument();
    expect(screen.getByAltText(placeImageAltText).getAttribute('src')).toBe(offerCardDataMock.previewImage);
    expect(+screen.getByAltText(placeImageAltText).getAttribute('width')!).toBe(PlaceImageSize.WidtDefault);
    expect(+screen.getByAltText(placeImageAltText).getAttribute('height')!).toBe(PlaceImageSize.HeightDefault);
    expect(screen.getByText(toBookmarksText)).toBeInTheDocument();
    expect(screen.getByText(ratingText)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByTestId(offerCardTestId)).toHaveClass('cities__card');
    expect(screen.getByTestId(cardImageWrapperTestId)).toHaveClass('cities__image-wrapper');
    expect(screen.getByTestId(offerPriceTestId).textContent).toContain(offerCardDataMock.price);
    expect(screen.getByTestId(bookmarkButtonTestId)).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByTestId(ratingStarsTestId).getAttribute('style'))
      .toBe(`width: ${getStarsFillingWith(offerCardDataMock.rating)};`);
    expect(screen.getByTestId(cardNameTestId).textContent).toBe(offerCardDataMock.title);
    expect(screen.getByTestId(offerTypeTestId).textContent).toBe(offerCardDataMock.type);
  });

  it('should render properly, when isFavoritesScreen is true', () => {
    render(withHistoryComponent(true));
    const imageElement = screen.getByAltText(placeImageAltText);

    expect(screen.getByTestId(offerCardTestId)).toHaveClass('favorites__card');
    expect(screen.getByTestId(cardImageWrapperTestId)).toHaveClass('favorites__image-wrapper');
    expect(+imageElement.getAttribute('width')!).toBe(PlaceImageSize.WidthSmall);
    expect(+imageElement.getAttribute('height')!).toBe(PlaceImageSize.HeightSmall);
  });

  it('should render properly, when isOfferScreen is true', () => {
    render(withHistoryComponent(false, true));

    expect(screen.getByTestId(offerCardTestId)).toHaveClass('near-places__card');
    expect(screen.getByTestId(cardImageWrapperTestId)).toHaveClass('near-places__image-wrapper');
  });

  it('should call handleCardHover, when hovering the card', async () => {
    const imageLinkTestId = 'image-link';

    render(withHistoryComponent());
    await userEvent.hover(screen.getByTestId(imageLinkTestId));
    await userEvent.unhover(screen.getByTestId(imageLinkTestId));

    expect(onHoverMock).toHaveBeenCalledWith(offerCardDataMock.id);
    expect(onHoverMock).toHaveBeenCalledWith(null);
  });
});
