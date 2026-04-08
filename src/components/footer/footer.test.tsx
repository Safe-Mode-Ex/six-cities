import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils';
import Footer from './footer';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../enums';

describe('Component: Footer', () => {
  const expectedAltText = '6 cities logo';
  let history: MemoryHistory;
  let preparedComponent: JSX.Element;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.Favorites);
    preparedComponent = withHistory(<Footer />, history);
  });

  it('should render properly', () => {
    render(preparedComponent);
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });

  it('should lead to main route when clicking link', async () => {
    render(preparedComponent);
    await userEvent.click(screen.getByAltText(expectedAltText));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});
