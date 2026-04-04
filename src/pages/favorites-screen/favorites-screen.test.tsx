import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoritesScreen from './favorites-screen';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';
import { FavoriteState, State } from '../../types/app-state';
import { getFakeFavorite } from '../../utils/mocks';

describe('Component: FavoritesScreen', () => {
  const pageTestId = 'page-favorites';
  let stateMock: Partial<State>;
  let withHistoryComponent: JSX.Element;

  beforeEach(() => {
    stateMock = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      [NameSpace.Favorite]: {
        favorite: {},
        favoriteOffersCount: 0,
        isFavoriteLoading: false,
      }
    };
    withHistoryComponent = withHistory(<FavoritesScreen />);
  });

  it('should render properly', () => {
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);
    render(withStoreComponent);
    expect(screen.getByTestId(pageTestId)).toBeInTheDocument();
  });

  it('should show LoadingScreen if isFavoriteLoading is true', () => {
    (stateMock.favorite as FavoriteState).isFavoriteLoading = true;
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('should show NoFavorites if no favorite offers is gotten', () => {
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByTestId(pageTestId)).toHaveClass('page__main--favorites-empty');
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('should show Favorites if favorite offers is gotten', () => {
    (stateMock.favorite as FavoriteState).favorite = { 'Amsterdam': getFakeFavorite() };
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
