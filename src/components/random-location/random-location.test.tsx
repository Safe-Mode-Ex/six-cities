import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils';
import RandomLocation from './random-location';
import * as helpers from '../../utils/helpers';

describe('Component: RandomLocation', () => {
  let preparedComponent: JSX.Element;

  beforeEach(() => {
    preparedComponent = withHistory(<RandomLocation />);
  });

  it('should render properly', () => {
    const currentLocationTestId = 'current-location';
    render(preparedComponent);
    expect(screen.getByTestId(currentLocationTestId)).toBeInTheDocument();
  });

  it('should call getRandomInRange on mount', () => {
    const getRandomInRangeSpy = vi.spyOn(helpers, 'getRandomInRange');
    render(preparedComponent);
    expect(getRandomInRangeSpy).toHaveBeenCalled();
  });
});
