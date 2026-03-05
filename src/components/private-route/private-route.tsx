import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/authorization-status';
import { AppRoute } from '../../types/app-route.type';

type PrivateRouteProps = {
    children: JSX.Element;
    authorizationStatus: AuthorizationStatus;
};

export function PrivateRoute({children, authorizationStatus}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
