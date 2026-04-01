import Sort from '../sort/sort';
import OffersList from '../offers-list/offers-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Offer } from '../../types/offer';
import { memo } from 'react';
import { getSortType } from '../../store/offers-process/selectors';
import { sortOffersBy } from '../../utils/helpers';

type PlacesProps = {
  offers: Offer[];
  handleOfferHover: (offerId: string | null) => void;
}

function Offers({ offers, handleOfferHover }: PlacesProps): JSX.Element {
  const sortType = useAppSelector(getSortType);
  const sortedOffers = sortOffersBy(sortType, offers);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      <Sort />
      <OffersList offers={sortedOffers} handleOfferHover={handleOfferHover} />
    </section>
  );
}

const MemoizedOffers = memo(Offers);

export default MemoizedOffers;
