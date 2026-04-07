import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import FavoritesScreen from './favorites-screen';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';
import { FavoriteState, State } from '../../types';
import { getFakeFavorite } from '../../utils';

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
        favorites: [],
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
    (stateMock.favorite as FavoriteState).favorites = getFakeFavorite();
    const { withStoreComponent } = withStore(withHistoryComponent, stateMock);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
