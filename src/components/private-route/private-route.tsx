import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { AppRoute } from '../../types/app-route';
import { selectAuthorizedStatus } from '../../store/user-process/selector';

type PrivateRouteProps = {
    children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);
  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
