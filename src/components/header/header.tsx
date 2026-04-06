import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import Logo from '../logo/logo';
import { AppRoute } from '../../types/app-route';
import { logoutAction } from '../../store/api-actions';
import { memo, MouseEvent } from 'react';
import { selectAuthorizedStatus, selectUser } from '../../store/user-process/selector';
import { selectFavoriteOffersCount } from '../../store/favorite-process/selectors';

type HeaderProps = {
    hasUserMenu?: boolean;
}

function Header({ hasUserMenu = true }: HeaderProps): JSX.Element {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);
  const user = useAppSelector(selectUser);
  const favoriteOffersCount = useAppSelector(selectFavoriteOffersCount);
  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {hasUserMenu && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user" data-testid="user-nav-item">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {isAuthorized ? (
                      <>
                        <span
                          className="header__user-name user__name"
                          data-testid="user-email"
                        >{user?.email}
                        </span>
                        <span
                          className="header__favorite-count"
                          data-testid="favorite-count"
                        >{favoriteOffersCount}
                        </span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
                {isAuthorized && (
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
