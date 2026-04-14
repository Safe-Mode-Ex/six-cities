import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import cn from 'classnames';
import { AppRoute } from '../../enums';
import { LOGO_IMAGE_URL } from '../../const';

const HEADER_LOGO_LINK_CLASS_NAME = 'header__logo-link';

function Logo(): JSX.Element {
  return (
    <NavLink
      end
      to={AppRoute.Main}
      className={({ isActive }) => cn(
        HEADER_LOGO_LINK_CLASS_NAME,
        { [`${HEADER_LOGO_LINK_CLASS_NAME}--active`]: isActive },
      )}
    >
      <img
        className="header__logo"
        src={LOGO_IMAGE_URL}
        alt="6 cities logo"
        width="81"
        height="41"
      />
    </NavLink>
  );
}

const MemoizedLogo = memo(Logo);

export default MemoizedLogo;
