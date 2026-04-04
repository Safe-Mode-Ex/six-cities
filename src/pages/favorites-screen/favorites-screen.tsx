import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFavorite, getIsFavoriteLoading } from '../../store/favorite-process/selectors';
import NoFavorites from '../../components/no-favorites/no-favorites';
import cn from 'classnames';
import Footer from '../../components/footer/footer';
import Favorites from '../../components/favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import { Helmet } from 'react-helmet-async';

function FavoritesScreen(): JSX.Element {
  const favorite = useAppSelector(getFavorite);
  const isLoading = useAppSelector(getIsFavoriteLoading);
  const favoriteEntries = Object.entries(favorite);
  const hasFavorites = favoriteEntries.length;

  return isLoading ?
    <LoadingScreen /> :
    (
      <div className={cn(
        'page',
        { 'page--favorites-empty': !hasFavorites }
      )}
      >
        <Helmet>
          <title>6 cities. Favorites</title>
        </Helmet>
        <Header />

        <main
          className={cn(
            'page__main page__main--favorites',
            { 'page__main--favorites-empty': !hasFavorites }
          )}
          data-testid="page-favorites"
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
