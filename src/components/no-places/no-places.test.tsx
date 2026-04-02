import { render, screen } from '@testing-library/react';
import NoPlaces from './no-places';

describe('Component: NoPlaces', () => {
  it('should render properly', () => {
    const expectedHeadingText = 'No places to stay available';
    const expectedCityName = 'Paris';
    const expectedDescriptionText = `We could not find any property available at the moment in ${expectedCityName}`;

    render(<NoPlaces city={expectedCityName} />);

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });
});
