import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import MemoizedOffers from './offers';
import { NameSpace, SortType } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: Offers', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: [],
      sortType: SortType.POPULAR,
      isOffersLoading: true,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
  };

  it('should render properly', () => {
    const expectedHeadingText = 'Places';
    const expectedFoundText = /places to stay in/i;
    const offersMock = getFakeOffers();
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedOffers offers={offersMock} handleOfferHover={vi.fn()} />),
      state,
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedFoundText)).toBeInTheDocument();
  });
});
