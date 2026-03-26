import { memo } from 'react';
import { Offer } from '../../types/offer';
import OffersList from '../offers-list/offers-list';

type NearbyOffersProps = {
    nearbyOffers: Offer[];
}

function NearbyOffers({ nearbyOffers }: NearbyOffersProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OffersList offers={nearbyOffers} isOfferScreen />
    </section>
  );
}

const MemoizedNearbyOffers = memo(NearbyOffers);

export default MemoizedNearbyOffers;
