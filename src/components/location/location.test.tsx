import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CITIES } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import Location from './location';

describe('Component: Location', () => {
  const expectedCity = CITIES[0];
  const onCityClickMock = vi.fn();
  let withHistoryComponent: JSX.Element;

  beforeEach(() => {
    const { withStoreComponent } = withStore(
      <Location city={expectedCity} onCityClick={onCityClickMock} />
    );
    withHistoryComponent = withHistory(withStoreComponent);
  });

  it('should render properly', () => {
    render(withHistoryComponent);
    expect(screen.getByText(expectedCity)).toBeInTheDocument();
  });

  it('should call onCityClick, when user clicks item', async () => {
    render(withHistoryComponent);
    await userEvent.click(screen.getByRole('link'));

    expect(onCityClickMock).toHaveBeenCalled();
  });
});
