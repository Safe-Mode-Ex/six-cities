import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <div style={{textAlign: 'center', padding: '50px'}}>
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
