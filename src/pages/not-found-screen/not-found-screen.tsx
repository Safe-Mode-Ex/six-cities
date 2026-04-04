import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import styles from './not-found.module.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.notFoundPage}>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <Logo />
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFoundScreen;
