import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import OfferScreen from './offer-screen';
import { render, screen } from '@testing-library/react';
import { OfferDetailsState, State } from '../../types/app-state';
import { NameSpace } from '../../enums';
import { getFakeOfferDetails } from '../../utils/mocks';
import { AuthorizationStatus } from '../../types/authorization-status';
import { OfferDetails } from '../../types/offer';

const useOfferDataMock = vi.hoisted(() => vi.fn());

vi.mock('../../hooks/use-offer-data.ts', () => ({
  default: useOfferDataMock,
}));

describe('Component: OfferScreen', () => {
  let stateMock: Partial<State>;
  let history: MemoryHistory;
  let preparedComponent: JSX.Element;

  beforeEach(() => {
    stateMock = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      [NameSpace.Offer]: {
        offerDetails: getFakeOfferDetails(),
        offerReviews: [],
        nearbyOffers: [],
      },
      [NameSpace.Favorite]: {
        favorite: {},
        favoriteOffersCount: 0,
        isFavoriteLoading: false,
      }
    };
    history = createMemoryHistory();
    const historyComponent = withHistory(<OfferScreen />, history);
    const { withStoreComponent } = withStore(historyComponent, stateMock);
    preparedComponent = withStoreComponent;
  });

  it('should render properly', () => {
    const bedroomsText = /Bedrooms/i;
    const adultsText = /adults/i;
    const nightText = /night/i;
    const hostText = /Meet the host/i;
    const hostAvatarAltText = /Host avatar/i;

    render(preparedComponent);

    expect(screen.getByText(bedroomsText)).toBeInTheDocument();
    expect(screen.getByText(adultsText)).toBeInTheDocument();
    expect(screen.getByText(nightText)).toBeInTheDocument();
    expect(screen.getByText(hostText)).toBeInTheDocument();
    expect(screen.getByAltText(hostAvatarAltText).getAttribute('src'))
      .toBe(stateMock.offer?.offerDetails?.host.avatarUrl);
  });

  it('should show LoadingScreen if no offerDetails fetched yet', () => {
    const loadingText = /Loading/i;
    (stateMock[NameSpace.Offer] as OfferDetailsState).offerDetails = null;

    render(preparedComponent);

    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('should call useOfferData on mount', () => {
    render(preparedComponent);
    expect(useOfferDataMock).toHaveBeenCalled();
  });

  it('should show Premium and Pro labels if has corresponding data', () => {
    ((stateMock[NameSpace.Offer] as OfferDetailsState).offerDetails as OfferDetails).isPremium = true;
    ((stateMock[NameSpace.Offer] as OfferDetailsState).offerDetails as OfferDetails).host.isPro = true;
    const proText = /Pro/i;
    const premiumText = /Premium/i;

    render(preparedComponent);

    expect(screen.getByText(proText)).toBeInTheDocument();
    expect(screen.getByText(premiumText)).toBeInTheDocument();
  });
});
