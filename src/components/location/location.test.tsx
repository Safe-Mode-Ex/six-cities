import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import { withHistory, withStore } from '../../utils';
import Location from './location';

describe('Component: Location', () => {
  const expectedCity = CITIES[0];
  let withHistoryComponent: JSX.Element;

  beforeEach(() => {
    const { withStoreComponent } = withStore(
      <Location city={expectedCity} />
    );
    withHistoryComponent = withHistory(withStoreComponent);
  });

  it('should render properly', () => {
    render(withHistoryComponent);
    expect(screen.getByText(expectedCity)).toBeInTheDocument();
  });
});
