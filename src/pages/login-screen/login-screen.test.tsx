import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import LoginScreen from './login-screen';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';
import { createMemoryHistory } from 'history';
import { State, UserProcessState } from '../../types';

describe('Component: LoginScreen', () => {
  let stateMock: Partial<State>;

  beforeEach(() => {
    stateMock = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      [NameSpace.Favorite]: {
        isFavoriteLoading: false,
        favorites: [],
      },
    };
  });

  it('should render properly', () => {
    const loginTitleTestId = 'login-title';
    const withHistoryComponent = withHistory(<LoginScreen />);
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByTestId(loginTitleTestId)).toBeInTheDocument();
  });

  it('should redirect to / if user is authorized', () => {
    (stateMock[NameSpace.User] as UserProcessState).authorizationStatus = AuthorizationStatus.Auth;
    const history = createMemoryHistory({ initialEntries: ['/login'] });
    const withHistoryComponent = withHistory(<LoginScreen />, history);
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(history.location.pathname).toBe('/');
  });
});
