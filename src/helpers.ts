import { SortType } from './enums';
import { Offer, OfferMapPoint } from './types/offer';

export const sortOffersBy = (sortType: SortType, offers: Offer[]): Offer[] => [...offers].sort((prev, next) => {
  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return prev.price - next.price;
    case SortType.PRICE_HIGH_TO_LOW:
      return next.price - prev.price;
    case SortType.TOP_RATED_FIRST:
      return next.rating - prev.rating;
    default:
      return 0;
  }
});

export const getCityPoints = (cityOffers: Offer[]): OfferMapPoint[] => cityOffers
  .map(({ location, id }) => ({
    location,
    id,
  }));

export const getDefaultSortTypes = () => Object.values(SortType);
