import { render, screen } from '@testing-library/react';
import { getFakeFavorite } from '../../utils/mocks';
import Favorites from './favorites';
import { Offer } from '../../types/offer';
import { withHistory } from '../../utils/mock-component';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: FavoritesComponent', () => {
  it('shoud render properly', () => {
    const expectedText = /Saved listing/i;
    const favoritesListTestId = 'favorites-list';
    const favoriteEntries = [['Amsterdam', getFakeFavorite()] as [string, Offer[]]];
    const preparedComponent = withHistory(<Favorites favoriteEntries={favoriteEntries} />);

    render(preparedComponent);

    expect((screen.getByText(expectedText))).toBeInTheDocument();
    expect(screen.getByTestId(favoritesListTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(favoriteEntries.length);
  });
});
