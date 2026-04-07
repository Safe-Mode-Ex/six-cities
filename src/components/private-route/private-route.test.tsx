import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute } from '../../types/app-route';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';
import { State } from '../../types/app-state';

describe('Component: PrivaRoute', () => {
  let mockHistory: MemoryHistory;
  let state: Pick<State, NameSpace.User>;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
    state = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      }
    };
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user is not authorized', () => {
    const expectedtext = 'public route';
    const unexpectedText = 'private route';
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<span>{expectedtext}</span>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <span>{unexpectedText}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory,
      ),
      state,
    );
    state[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

    render(withStoreComponent);

    expect(screen.getByText(expectedtext)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorizzed', () => {
    const expectedtext = 'private route';
    const unexpectedText = 'public route';
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<span>{unexpectedText}</span>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <span>{expectedtext}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory,
      ),
      state,
    );
    state[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;

    render(withStoreComponent);

    expect(screen.getByText(expectedtext)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });
});
