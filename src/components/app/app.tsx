import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Offer } from '../../types/offer';
import MainScreen from './../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../types/authorization-status';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../types/app-route';
import { Settings } from '../../types/settings';
import { useAppSelector } from '../../hooks/use-app-selector';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  offers: Offer[];
  settings: Settings;
};

function App({offers, settings}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  const favorites = new Map<string, Offer[]>();

  offers
    .filter(({isFavorite}) => isFavorite)
    .forEach((offer) => {
      const cityOffers = favorites.get(offer.city.name);

      if (cityOffers) {
        cityOffers.push(offer);
      } else {
        favorites.set(offer.city.name, [offer]);
      }
    });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen mapTemplate={settings.LEAFLET_VOYAGER_URL_TEMPLATE} />
        }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={
            <OfferScreen
              reviewMinLength={settings.REVIEW_COMMENT_MIN_LENGTH}
              reviewMaxLength={settings.REVIEW_COMMENT_MAX_LENGTH}
              mapTemplate={settings.LEAFLET_VOYAGER_URL_TEMPLATE}
            />
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen favorites={favorites} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
