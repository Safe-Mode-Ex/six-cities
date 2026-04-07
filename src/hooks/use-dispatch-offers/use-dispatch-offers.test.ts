import { renderHook } from '@testing-library/react';
import useDispatchOffers from './use-dispatch-offers';
import { setOffersLoading } from '../../store/offers-process/offers-process';

const mocks = vi.hoisted(() => ({
  dispatchMock: vi.fn(() => ({ abort: vi.fn() })),
  fetchOffersActionMock: vi.fn(),
}));

vi.mock('../../store/api-actions', () => ({
  fetchOffersAction: mocks.fetchOffersActionMock,
}));

vi.mock('../use-app-selector/use-app-selector', () => ({
  useAppDispatch: () => mocks.dispatchMock,
}));

describe('Hook: useDispatchOffers', () => {
  it('should dispatch fetchOffersAction on mount', () => {
    renderHook(() => useDispatchOffers());
    expect(mocks.fetchOffersActionMock).toHaveBeenCalled();
  });

  it('should dispatch setOffersLoading with true on unmount', () => {
    const { unmount } = renderHook(() => useDispatchOffers());
    unmount();

    expect(mocks.dispatchMock).toHaveBeenCalledWith(setOffersLoading(true));
  });
});
