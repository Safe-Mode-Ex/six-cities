import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AppRoute } from '../../types/app-route';
import { Navigate } from 'react-router-dom';
import { selectAuthorizedStatus } from '../../store/user-process/selector';
import LoginForm from '../../components/login-form/login-form';
import { Helmet } from 'react-helmet-async';
import RandomLocation from '../../components/random-location/random-location';

function LoginScreen(): JSX.Element {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);

  return isAuthorized ? <Navigate to={AppRoute.Main} /> : (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Introduce yourself</title>
      </Helmet>
      <Header hasUserMenu={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="login-title">Sign in</h1>
            <LoginForm />
          </section>
          <RandomLocation />
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
