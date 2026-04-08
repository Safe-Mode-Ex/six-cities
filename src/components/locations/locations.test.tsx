import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import Locations from './locations';
import { withHistory, withStore } from '../../utils';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => vi.fn(),
}));

describe('Component: Locations', () => {
  beforeEach(() => {
    const { withStoreComponent } = withStore(withHistory(<Locations />));
    render(withStoreComponent);
  });

  it('should render properly', () => {
    const expectedTestId = 'locations-container';
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render correct number of locations', () => {
    expect(screen.getAllByRole('listitem').length).toBe(CITIES.length);
  });
});
