import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
  it('should render properly', () => {
    const expectedText = /Loading/i;
    const expectedDesc = /Take a deep breath/i;

    render(<LoadingScreen />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedDesc)).toBeInTheDocument();
  });
});
