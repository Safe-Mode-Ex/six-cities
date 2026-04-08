import cn from 'classnames';
import { Offer } from '../../types';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
    offers: Offer[];
    isFavoritesScreen?: boolean;
    isOfferScreen?: boolean;
    handleOfferHover?: (offerId: string | null) => void;
};

function OffersList({
  offers,
  handleOfferHover,
  isFavoritesScreen = false,
  isOfferScreen = false
}: OffersListProps): JSX.Element {
  return (
    <div
      className={cn({
        'favorites__places': isFavoritesScreen,
        'places__list': !isFavoritesScreen,
        'near-places__list': isOfferScreen,
        'cities__places-list tabs__content': !isFavoritesScreen && !isOfferScreen,
      })}
      data-testid="offers-list"
    >
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.id}`}
          offer={offer}
          onHover={handleOfferHover ?? (() => {})}
          isFavoritesScreen={isFavoritesScreen}
        />
      ))}
    </div>
  );
}

export default OffersList;
