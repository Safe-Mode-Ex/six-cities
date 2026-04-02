import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import Locations from './locations';
import { withHistory } from '../../utils/mock-component';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => vi.fn(),
}));

describe('Component: Locations', () => {
  it('should render properly', () => {
    const expectedTestId = 'locations-container';
    render(withHistory(<Locations activeCity={CITIES[0]} />));
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render correct number of locations', () => {
    render(withHistory(<Locations activeCity={CITIES[0]} />));
    expect(screen.getAllByRole('listitem').length).toBe(CITIES.length);
  });
});
