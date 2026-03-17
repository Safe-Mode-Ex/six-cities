import { SortType } from './enums';
import { Offer, OfferMapPoint } from './types/offer.type';

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

export const getCityPoints = (offers: Offer[], activeCityName: string): OfferMapPoint[] => offers
  .filter(({ city }) => city.name === activeCityName)
  .map(({ city, id }) => ({
    ...city,
    id,
  }));
