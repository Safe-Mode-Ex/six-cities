import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { SortType } from '../../enums';
import { setActiveOfferId } from '../../store/action';

function Places(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const handleActiveOfferIdSet = (id: number | null) => {
    dispatch(setActiveOfferId(id));
  };

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
      <OffersList offers={sortedOffers} setActiveOfferId={handleActiveOfferIdSet} />
    </section>
  );
}

export default Places;
