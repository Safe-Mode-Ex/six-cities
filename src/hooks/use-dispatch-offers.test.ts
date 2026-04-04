import { renderHook } from '@testing-library/react';
import useDispatchOffers from './use-dispatch-offers';
import { fetchOffersAction } from '../store/api-actions';
import { setOffersLoading } from '../store/offers-process/offers-process';

const dispatchMock = vi.fn();

vi.mock('../store/api-actions', () => ({
  fetchOffersAction: vi.fn(),
}));

vi.mock('./use-app-selector', () => ({
  useAppDispatch: () => dispatchMock,
}));

describe('Hook: useDispatchOffers', () => {
  it('should dispatch fetchOffersAction on mount', () => {
    renderHook(() => useDispatchOffers());
    expect(fetchOffersAction).toHaveBeenCalled();
  });

  it('should dispatch setOffersLoading with true on unmount', () => {
    const { unmount } = renderHook(() => useDispatchOffers());
    unmount();

    expect(dispatchMock).toHaveBeenCalledWith(setOffersLoading(true));
  });
});
