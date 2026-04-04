import { render, screen } from '@testing-library/react';
import NoFavorites from './no-favorites';

describe('Component: NoFavorites', () => {
  it('should render properly', () => {
    const expectedHeadingText = 'Nothing yet saved.';
    const expectedDescriptionText = 'Save properties to narrow down search or plan your future trips.';

    render(<NoFavorites />);

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });
});
