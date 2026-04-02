import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import FavoritesLocation from './favorites-location';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: FavoritesLocation', () => {
  it('should render properly', () => {
    const expectedText = 'Amsterdam';
    const offersMock = getFakeOffers();
    const preparedComponent = withHistory(<FavoritesLocation city={expectedText} offers={offersMock} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
