import { Route, Routes } from 'react-router-dom';
import { Offer } from '../../types/offer';
import MainScreen from './../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../types/app-route';
import { useAppSelector } from '../../hooks/use-app-selector';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getAuthCheckedStatus } from '../../store/user-process/selector';
import { getIsOffersDataLoading } from '../../store/offers/selector';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  if (!isAuthChecked || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  const favorites = new Map<string, Offer[]>();

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen />
        }
        />
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
              <FavoritesScreen favorites={favorites} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
