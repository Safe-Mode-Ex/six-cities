import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AppRoute } from '../../types/app-route';
import { Navigate } from 'react-router-dom';
import { getAuthorizedStatus } from '../../store/user-process/selector';
import LoginForm from '../../components/login-form/login-form';
import { Helmet } from 'react-helmet-async';

function LoginScreen(): JSX.Element {
  const isAuthorized = useAppSelector(getAuthorizedStatus);

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
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
