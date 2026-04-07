import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../utils/mocks';
import NearbyOffers from './nearby-offers';
import { withHistory, withStore } from '../../utils/mock-component';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: Nearbyoffers', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
  };

  it('should render properly', () => {
    const expectedTitleText = /Other places in the neighbourhood/i;
    const nearbyOffers = getFakeOffers();
    const { withStoreComponent } = withStore(
      withHistory(<NearbyOffers nearbyOffers={nearbyOffers} />),
      state,
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
  });
});
