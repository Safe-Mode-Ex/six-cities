import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import MemoizedHeader from './header';
import { APIRoute, NameSpace } from '../../enums';
import { State, UserProcessState } from '../../types/app-state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { CITIES } from '../../const';
import { AppRoute } from '../../types/app-route';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { extractActionsTypes, getFakeOffers } from '../../utils/mocks';
import { logoutAction } from '../../store/api-actions';
import MainScreen from '../../pages/main-screen/main-screen';
import { getDefaultSortTypes } from '../../utils/helpers';

describe('Component: Header', () => {
  let stateMock: Partial<State>;

  beforeEach(() => {
    stateMock = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      [NameSpace.Favorite]: {
        favoriteOffersCount: 0,
        favorite: { [CITIES[0]]: []},
        isFavoriteLoading: false,
      }
    };
  });

  it('should render properly', () => {
    const hasUserMenu = false;
    const { withStoreComponent } = withStore(<MemoizedHeader hasUserMenu={hasUserMenu} />, stateMock);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should not render navigation if hasUserMenu is false', () => {
    const hasUserMenu = false;
    const { withStoreComponent } = withStore(<MemoizedHeader hasUserMenu={hasUserMenu} />, stateMock);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render navigation if hasUserMenu is true', () => {
    const hasUserMenu = true;
    const { withStoreComponent } = withStore(<MemoizedHeader hasUserMenu={hasUserMenu} />, stateMock);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  describe('should render properly if isAuthorized is true', () => {
    let preparedComponent: JSX.Element;

    beforeEach(() => {
      const hasUserMenu = true;
      (stateMock.user as UserProcessState).authorizationStatus = AuthorizationStatus.Auth;
      const { withStoreComponent } = withStore(<MemoizedHeader hasUserMenu={hasUserMenu} />, stateMock);
      preparedComponent = withHistory(withStoreComponent);
    });

    it('should render user nav item if isAuthorized is true', () => {
      const userNavItemTestId = 'user-nav-item';

      render(preparedComponent);
      const userNavItem = screen.getByTestId(userNavItemTestId);

      expect(userNavItem).toBeInTheDocument();
      expect(userNavItem.getElementsByTagName('a')[0].getAttribute('href')).toBe(AppRoute.Favorites);
    });

    it('should render user info if Authorized is true', () => {
      const userEmailTestId = 'user-email';
      const favoriteCountTestId = 'favorite-count';
      (stateMock.user as UserProcessState).user = {
        email: 'test@test.com',
        avatarUrl: '',
        isPro: false,
        name: '',
        token: ''
      };

      render(preparedComponent);

      expect(screen.getByTestId(userEmailTestId).textContent!).toBe(stateMock.user?.user?.email);
      expect(+screen.getByTestId(favoriteCountTestId).textContent!).toBe(stateMock.favorite?.favoriteOffersCount);
    });

    it('should render Sign out link if isAuthorized is true', () => {
      const expectedText = /Sign out/i;
      render(preparedComponent);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it('should log out if Sign out button has been clicked', async () => {
      const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
        <MemoizedHeader hasUserMenu />,
        stateMock
      );
      preparedComponent = withHistory(withStoreComponent);
      const buttonText = 'Sign out';
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      render(preparedComponent);
      await userEvent.click(screen.getByText(buttonText).closest('a') as HTMLElement);
      const actions = extractActionsTypes(mockStore.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('should render properly if isAuthorized is false', () => {
    let preparedComponent: JSX.Element;

    beforeEach(() => {
      const hasUserMenu = true;
      (stateMock.user as UserProcessState).authorizationStatus = AuthorizationStatus.NoAuth;
      const { withStoreComponent } = withStore(<MemoizedHeader hasUserMenu={hasUserMenu} />, stateMock);
      preparedComponent = withHistory(withStoreComponent);
    });

    it('should not render user nav item if isAuthorized is false', () => {
      const userNavItemTestId = 'user-nav-item';

      render(preparedComponent);
      const userNavItem = screen.getByTestId(userNavItemTestId);

      expect(userNavItem).toBeInTheDocument();
      expect(userNavItem.getElementsByTagName('a')[0].getAttribute('href')).toBe(AppRoute.Login);
    });

    it('should not render user info if isAuthorized is false', () => {
      const userEmailTestId = 'user-email';
      const favoriteCountTestId = 'favorite-count';

      render(preparedComponent);

      expect(screen.queryByTestId(userEmailTestId)).not.toBeInTheDocument();
      expect(screen.queryByTestId(favoriteCountTestId)).not.toBeInTheDocument();
    });

    it('should render Sign in link if isAuthorized is false', () => {
      const expectedText = /Sign in/i;
      render(preparedComponent);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it('should log in if Sign in button has been clicked', async () => {
      stateMock.offers = {
        offers: getFakeOffers(),
        sortType: getDefaultSortTypes()[0],
        isOffersLoading: false,
      };
      const expectedText = 'Login screen';
      const mockLoginRouteComponent = <span>{expectedText}</span>;
      const mockHistory = createMemoryHistory();
      mockHistory.push(`${AppRoute.Main}paris`);
      const componentWithHistory = withHistory(
        <Routes>
          <Route path={`${AppRoute.Main}:cityName`} element={<MainScreen />} />
          <Route path={AppRoute.Login} element={mockLoginRouteComponent} />
        </Routes>,
        mockHistory,
      );
      const { withStoreComponent } = withStore(componentWithHistory, stateMock);
      const buttonText = 'Sign in';

      render(withStoreComponent);
      await userEvent.click(screen.getByText(buttonText));

      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});
