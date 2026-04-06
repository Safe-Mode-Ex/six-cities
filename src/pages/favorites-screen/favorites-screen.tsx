import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectFavorite, selectIsFavoriteLoading } from '../../store/favorite-process/selectors';
import NoFavorites from '../../components/no-favorites/no-favorites';
import cn from 'classnames';
import Footer from '../../components/footer/footer';
import Favorites from '../../components/favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import { Helmet } from 'react-helmet-async';
import styles from './favorites-screen.module.css';

function FavoritesScreen(): JSX.Element {
  const favorite = useAppSelector(selectFavorite);
  const isLoading = useAppSelector(selectIsFavoriteLoading);
  const favoriteEntries = Object.entries(favorite);
  const hasFavorites = favoriteEntries.length;

  return isLoading ?
    <LoadingScreen /> :
    (
      <div className={cn(
        'page',
        styles.page,
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
            styles.pageMainFavorites,
            { 'page__main--favorites-empty': !hasFavorites }
          )}
          data-testid="page-favorites"
        >
          <div className={cn(
            'page__favorites-container container',
            styles.pageFavoritesContainer,
          )}
          >
            {hasFavorites ? <Favorites favoriteEntries={favoriteEntries} /> : <NoFavorites />}
          </div>
        </main>

        <Footer />
      </div>
    );
}

export default FavoritesScreen;
