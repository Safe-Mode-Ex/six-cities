import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../utils';
import NearbyOffers from './nearby-offers';
import { withHistory, withStore } from '../../utils';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';

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
