import { Navigate, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainScreen from './../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../types/app-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { selectAuthCheckedStatus } from '../../store/user-process/selector';
import { CITIES } from '../../const';
import useFetchFavoriteOffers from '../../hooks/use-fetch-favorite-offers/use-fetch-favorite-offers';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(selectAuthCheckedStatus);

  useFetchFavoriteOffers();

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={`${AppRoute.Main}${CITIES[0].toLowerCase()}`} />}
        />
        <Route path={`${AppRoute.Main}/:cityName`} element={<MainScreen />} />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={
            <OfferScreen />
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
