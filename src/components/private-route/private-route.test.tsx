import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute } from '../../types/app-route';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

const mocks = vi.hoisted(() => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../hooks/use-app-selector', () => ({
  useAppSelector: mocks.useAppSelector,
}));

describe('Component: PrivaRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user is not authorized', () => {
    const expectedtext = 'public route';
    const unexpectedText = 'private route';
    const preparedComponent = withHistory(
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
    );

    mocks.useAppSelector.mockReturnValue(false);
    render(preparedComponent);

    expect(screen.getByText(expectedtext)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorizzed', () => {
    const expectedtext = 'private route';
    const unexpectedText = 'public route';
    const preparedComponent = withHistory(
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
    );

    mocks.useAppSelector.mockReturnValue(true);
    render(preparedComponent);

    expect(screen.getByText(expectedtext)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });
});
