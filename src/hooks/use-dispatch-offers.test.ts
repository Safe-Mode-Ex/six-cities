import { renderHook } from '@testing-library/react';
import { AppDispatch } from '../types/app-state';
import useDispatchOffers from './use-dispatch-offers';
import { fetchOffersAction } from '../store/api-actions';

describe('Hook: useDispatchOffers', () => {
  it('should dispatch fetchOffersAction on mount', () => {
    vi.mock('../store/api-actions', () => ({
      fetchOffersAction: vi.fn(),
    }));
    vi.mock('./use-app-selector', () => ({
      useAppDispatch: () => (action: AppDispatch) => action,
    }));

    renderHook(() => useDispatchOffers());

    expect(fetchOffersAction).toHaveBeenCalled();
  });
});
