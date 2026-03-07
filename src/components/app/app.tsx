import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Offer } from '../../types/offer.type';
import MainScreen from './../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../types/authorization-status';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../types/app-route.type';
import { Review } from '../../types/review.type';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
  cities: string[];
};

function App({offers, reviews, cities}: AppProps): JSX.Element {
  const favorites = new Map<string, Offer[]>();

  offers
    .filter(({isFavorite}) => isFavorite)
    .forEach((offer) => {
      const cityOffers = favorites.get(offer.city);

      if (cityOffers) {
        cityOffers.push(offer);
      } else {
        favorites.set(offer.city, [offer]);
      }
    });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen offers={offers} cities={cities} />
        }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen reviews={reviews} />} />
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
