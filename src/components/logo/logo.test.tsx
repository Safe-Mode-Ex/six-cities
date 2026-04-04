import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  beforeEach(() => {
    const preparedComponent = withHistory(<Logo />);
    render(preparedComponent);
  });

  it('should render properly', () => {
    const expectedAltText = '6 cities logo';
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });

  it('should have active class when route is /', () => {
    const expectedClassName = 'header__logo-link--active';
    const logoLinkEl = screen.getByRole('link');

    expect(logoLinkEl).toHaveClass(expectedClassName);
  });
});
