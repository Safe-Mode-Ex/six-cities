import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../types/app-route';

const HEADER_LOGO_LINK_CLASS_NAME = 'header__logo-link';

function Logo(): JSX.Element {
  const getClassName =
    ({isActive}: {isActive: boolean}) =>
      `${HEADER_LOGO_LINK_CLASS_NAME}${isActive ? ` ${HEADER_LOGO_LINK_CLASS_NAME}--active` : ''}`;

  return (
    <NavLink
      to={AppRoute.Main}
      className={getClassName}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </NavLink>
  );
}

export default Logo;
