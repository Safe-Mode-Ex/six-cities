import { Offer } from '../../types/offer';
import FavoritesLocation from '../favorites-location/favorites-location';
import styles from './favorites.module.css';

type FavoritesProps = {
    favoriteEntries: [string, Offer[]][];
}

function Favorites({ favoriteEntries }: FavoritesProps): JSX.Element {
  return (
    <section className={`favorites ${styles.favorites}`}>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list" data-testid="favorites-list">
        {favoriteEntries.map(([city, offers]) => (
          <FavoritesLocation key={city} city={city} offers={offers} />
        ))}
      </ul>
    </section>
  );
}

export default Favorites;
