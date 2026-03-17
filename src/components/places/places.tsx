import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { SortType } from '../../enums';

type PlacesProps = {
  setActiveOfferId: (activeOfferId: number | null) => void;
};

function Places({setActiveOfferId}: PlacesProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);

  const sortedOffers = [...offers].sort((prev, next) => {
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


  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      <Sort />
      <OffersList offers={sortedOffers} setActiveOfferId={setActiveOfferId} />
    </section>
  );
}

export default Places;
