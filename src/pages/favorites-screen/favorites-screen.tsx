import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavorite } from '../../store/favorite/selector';
import { useEffect } from 'react';
import NoFavorites from '../../components/no-favorites/no-favorites';
import cn from 'classnames';
import Footer from '../../components/footer/footer';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(getFavorite);
  const favoriteEntries = Object.entries(favorite);
  const hasFavorites = favoriteEntries.length;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteOffersAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className={cn(
      'page',
      { 'page--favorites-empty': !hasFavorites }
    )}
    >
      <Header />

      <main className={cn(
        'page__main page__main--favorites',
        { 'page__main--favorites-empty': !hasFavorites }
      )}
      >
        <div className="page__favorites-container container">
          {hasFavorites ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoriteEntries.map(([city, offers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>

                    <OffersList offers={offers} isFavoritesScreen />
                  </li>
                ))}
              </ul>
            </section>
          ) : <NoFavorites />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
