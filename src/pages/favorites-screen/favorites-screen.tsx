import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavorite, getIsFavoriteLoading } from '../../store/favorite/selector';
import { useEffect } from 'react';
import NoFavorites from '../../components/no-favorites/no-favorites';
import cn from 'classnames';
import Footer from '../../components/footer/footer';
import Favorites from '../../components/favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(getFavorite);
  const isLoading = useAppSelector(getIsFavoriteLoading);
  const favoriteEntries = Object.entries(favorite);
  const hasFavorites = favoriteEntries.length;

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return isLoading ?
    <LoadingScreen /> :
    (
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
            {hasFavorites ? <Favorites favoriteEntries={favoriteEntries} /> : <NoFavorites />}
          </div>
        </main>

        <Footer />
      </div>
    );
}

export default FavoritesScreen;
