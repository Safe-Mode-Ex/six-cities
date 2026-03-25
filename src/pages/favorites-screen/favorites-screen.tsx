import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavorite } from '../../store/favorite/selector';
import { useEffect } from 'react';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(getFavorite);

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
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favorite).map(([city, offers]) => (
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
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
