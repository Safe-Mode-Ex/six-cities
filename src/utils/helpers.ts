import { CITIES } from '../const';
import { SortType } from '../enums';
import { CityOffersGroup, Offer, OfferMapPoint } from '../types';

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

export const getGroupedByCityOffers = (offers: Offer[]): CityOffersGroup => offers
  .reduce<CityOffersGroup>((groupedOffers, offer) => {
    const cityName = offer.city.name;
    const currentCityOffers = groupedOffers[cityName] ?? [];

    groupedOffers[cityName] = [...currentCityOffers, offer];

    return groupedOffers;
  }, {});

export const getCapitalizedString = (string?: string): string =>
  string ? `${string?.[0].toUpperCase()}${string?.slice(1, string.length)}` : '';

export const getRandomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const getActiveCityParams = (cityName = ''): [boolean, string] => {
  const currentCity = getCapitalizedString(cityName);
  const isValidCity = CITIES.some((city) => city === currentCity);
  const activeCityName = currentCity || CITIES[0];

  return [isValidCity, activeCityName];
};
