import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import MemoizedOffers from './offers';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Offers', () => {
  it('should render properly', () => {
    const expectedHeadingText = 'Places';
    const expectedFoundText = /places to stay in/i;
    const offersMock = getFakeOffers();

    render(withHistory(<MemoizedOffers offers={offersMock} handleOfferHover={vi.fn()} />));

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedFoundText)).toBeInTheDocument();
  });
});
