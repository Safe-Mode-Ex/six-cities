import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import MainScreen from './main-screen';
import { OffersState, State } from '../../types';
import { NameSpace, SortType } from '../../enums';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import { AuthorizationStatus } from '../../types';

const useDispatchOffersMock = vi.hoisted(() => vi.fn());

vi.mock('../../hooks/use-dispatch-offers/use-dispatch-offers.ts', () => ({
  default: useDispatchOffersMock,
}));

describe('Component: MainScreen', () => {
  let stateMock: Partial<State>;
  let history: MemoryHistory;
  let preparedComponent: JSX.Element;

  beforeEach(() => {
    stateMock = {
      [NameSpace.Offers]: {
        offers: [],
        isOffersLoading: false,
        sortType: SortType.Popular,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      [NameSpace.Favorite]: {
        favorites: [],
        isFavoriteLoading: false,
      },
    };

    history = createMemoryHistory({ initialEntries: ['/paris'] });

    const withHistoryComponent = withHistory(
      <Routes>
        <Route path="/:cityName" element={<MainScreen />} />
      </Routes>,
      history
    );

    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);
    preparedComponent = withStoreComponent;
  });

  it('should render properly', () => {
    const hiddenTitleText = 'Cities';
    render(preparedComponent);
    expect(screen.getByText(hiddenTitleText)).toBeInTheDocument();
  });

  it('should call useDispatchOffers on mount', () => {
    render(preparedComponent);
    expect(useDispatchOffersMock).toHaveBeenCalled();
  });

  it('should show NotFoundScreen if city is not valid', () => {
    const notFoundText = '404 Not Found';
    history = createMemoryHistory({ initialEntries: ['/pariss'] });
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path="/:cityName" element={<MainScreen />} />
      </Routes>,
      history
    );
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByText(notFoundText)).toBeInTheDocument();
  });

  it('should show LoadingScreen, when isOffersLoading is true', () => {
    const loadingText = /Loading/i;
    (stateMock[NameSpace.Offers] as OffersState).isOffersLoading = true;

    render(preparedComponent);

    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });
});
