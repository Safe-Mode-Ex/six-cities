import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render properly', () => {
    const expectedH1Text = /404 Not Found/i;
    const expectedText = /The page you are looking for does not exist/i;

    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText(expectedH1Text)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
