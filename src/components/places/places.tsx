import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { setActiveOfferId } from '../../store/action';
import { sortOffersBy } from '../../helpers';

function Places(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffers = sortOffersBy(sortType, offers);
  const dispatch = useAppDispatch();

  const handleActiveOfferIdSet = (id: number | null) => {
    dispatch(setActiveOfferId(id));
  };

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
