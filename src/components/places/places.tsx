import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { sortOffersBy } from '../../helpers';
import { Offer } from '../../types/offer';

type PlacesProps = {
  offers: Offer[];
}

function Places({ offers }: PlacesProps): JSX.Element {
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffers = sortOffersBy(sortType, offers);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      <Sort />
      <OffersList offers={sortedOffers} />
    </section>
  );
}

export default Places;
