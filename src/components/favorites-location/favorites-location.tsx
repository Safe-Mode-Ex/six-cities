import { Offer } from '../../types/offer';
import OffersList from '../offers-list/offers-list';

type FavoritesLocationProps = {
    city: string;
    offers: Offer[];
}

function FavoritesLocation({ city, offers }: FavoritesLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>

      <OffersList offers={offers} isFavoritesScreen />
    </li>
  );
}

export default FavoritesLocation;
