import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums';
import { LOGO_IMAGE_URL } from '../../const';

function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src={LOGO_IMAGE_URL}
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export default Footer;
