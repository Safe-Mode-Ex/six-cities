import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Offer } from '../../types/offer.type';
import MainScreen from './../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../types/authorization-status.type';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../types/app-route.type';
import { Settings } from '../../types/settings';

type AppProps = {
  offers: Offer[];
  cities: string[];
  settings: Settings;
};

function App({offers, cities, settings}: AppProps): JSX.Element {
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
          <MainScreen
            offers={offers}
            cities={cities}
            mapTemplate={settings.LEAFLET_VOYAGER_URL_TEMPLATE}
          />
        }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={
            <OfferScreen
              reviewMinLength={settings.REVIEW_COMMENT_MIN_LENGTH}
              reviewMaxLength={settings.REVIEW_COMMENT_MAX_LENGTH}
            />
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
