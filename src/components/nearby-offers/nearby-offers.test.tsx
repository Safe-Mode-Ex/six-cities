import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../utils/mocks';
import NearbyOffers from './nearby-offers';
import { withHistory } from '../../utils/mock-component';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Nearbyoffers', () => {
  it('should render properly', () => {
    const expectedTitleText = /Other places in the neighbourhood/i;
    const nearbyOffers = getFakeOffers();

    render(withHistory(<NearbyOffers nearbyOffers={nearbyOffers} />));

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
  });
});
