import { renderHook } from '@testing-library/react';
import useDispatchCity from './use-dispatch-city';
import { selectCity } from '../store/offers-process/offers-process';
import { CITIES } from '../const';
import { AppDispatch } from '../types/app-state';

vi.mock('../store/offers-process/offers-process', () => ({
  selectCity: vi.fn(),
}));

vi.mock('./use-app-selector', () => ({
  useAppDispatch: () => (action: AppDispatch) => action,
}));

describe('Hook: useDispatchCity', () => {
  it('should dispatch selectCity action with active city name on mount', () => {
    renderHook(() => useDispatchCity());
    expect(selectCity).toHaveBeenCalledWith(CITIES[0]);
  });
});
