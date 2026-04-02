import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import OffersList from './offers-list';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: OffersList', () => {
  const offersListTestId = 'offers-list';

  it('should render properly', () => {
    const offersMock = getFakeOffers();
    const preparedComponent = withHistory(<OffersList offers={offersMock} />);

    render(preparedComponent);

    expect(screen.getByTestId(offersListTestId)).toBeInTheDocument();
  });

  it('should have class favorites__places if isFavoriteScreen is true', () => {
    const offersMock = getFakeOffers();
    const preparedComponent = withHistory(<OffersList offers={offersMock} isFavoritesScreen />);

    render(preparedComponent);
    const offersListEl = screen.getByTestId(offersListTestId);

    expect(offersListEl).toHaveClass('favorites__places');
  });

  it('should have class places__list if isOfferScreen is true', () => {
    const offersMock = getFakeOffers();
    const preparedComponent = withHistory(<OffersList offers={offersMock} isOfferScreen />);

    render(preparedComponent);
    const offersListEl = screen.getByTestId(offersListTestId);

    expect(offersListEl).toHaveClass('near-places__list');
  });
});
