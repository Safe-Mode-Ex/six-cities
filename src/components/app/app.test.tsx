import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { getFakeOfferDetails, getFakeStore } from '../../utils/mocks';
import { AppRoute } from '../../types/app-route';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../types/authorization-status';
import { NameSpace } from '../../enums';
import { UserProcessState } from '../../types/app-state';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  let userInitialState: { [NameSpace.User]: UserProcessState };

  beforeEach(() => {
    mockHistory = createMemoryHistory();

    userInitialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    };
  });

  it('should render MainScreen when user navigates to /', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, getFakeStore(userInitialState));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render LoginScreen when user navigates to /login', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, getFakeStore(userInitialState));
    const loginTitleId = 'login-title';
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);
    const loginTitle = screen.getByTestId(loginTitleId);

    expect(loginTitle).toBeInTheDocument();
  });

  it('should render OfferScreen when user navigates to /offer/:id', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const initialState = {
      ...userInitialState,
      [NameSpace.Offer]: {
        offerDetails: getFakeOfferDetails(),
        offerReviews: [],
        nearbyOffers: [],
      }
    };
    const { withStoreComponent } = withStore(withHistoryComponent, getFakeStore(initialState));
    const offerPageTestId = 'offer-page';
    mockHistory.push(`${AppRoute.Offer}/1`);

    render(withStoreComponent);
    const offerPage = screen.getByTestId(offerPageTestId);

    expect(offerPage).toBeInTheDocument();
  });

  it('should render FavoritesScreen when user navigates to /favorites', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const pageFavoritesId = 'page-favorites';
    userInitialState.user.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(withHistoryComponent, getFakeStore(userInitialState));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    const pageFavorites = screen.getByTestId(pageFavoritesId);

    expect(pageFavorites).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigates to unknown route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, getFakeStore(userInitialState));
    const unknownRoute = '/unknown-route';
    const notFoundText = /404 Not Found/i;
    mockHistory.push(unknownRoute);

    render(withStoreComponent);
    const notFound = screen.getByText(notFoundText);

    expect(notFound).toBeInTheDocument();
  });
});
