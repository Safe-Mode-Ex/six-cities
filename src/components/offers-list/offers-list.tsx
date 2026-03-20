import cn from 'classnames';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { useAppDispatch } from '../../hooks/use-app-selector';
import { setActiveOfferId } from '../../store/action';

type OffersListProps = {
    offers: Offer[];
    isFavoritesScreen?: boolean;
    isOfferScreen?: boolean;
};

function OffersList({
  offers,
  isFavoritesScreen = false,
  isOfferScreen = false
}: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleOfferHover = (offerId: string | null) => {
    dispatch(setActiveOfferId(offerId));
  };

  return (
    <div className={cn({
      'favorites__places': isFavoritesScreen,
      'places__list': !isFavoritesScreen,
      'near-places__list': isOfferScreen,
      'cities__places-list tabs__content': !isFavoritesScreen && !isOfferScreen,
    })}
    >
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.id}`}
          offer={offer}
          onHover={handleOfferHover}
          isFavoritesScreen={isFavoritesScreen}
        />
      ))}
    </div>
  );
}

export default OffersList;
