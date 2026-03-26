import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types/app-route';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizedStatus } from '../../store/user/selector';

type PrivateRouteProps = {
    children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getAuthorizedStatus);
  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
