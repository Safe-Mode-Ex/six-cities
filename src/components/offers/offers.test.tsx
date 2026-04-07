import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import { getFakeOffers } from '../../utils';
import MemoizedOffers from './offers';
import { NameSpace, SortType } from '../../enums';
import { AuthorizationStatus } from '../../types';

describe('Component: Offers', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: [],
      sortType: SortType.Popular,
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
