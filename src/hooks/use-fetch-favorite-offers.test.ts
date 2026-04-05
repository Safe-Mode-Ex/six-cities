import { renderHook } from '@testing-library/react';
import useFetchFavoriteOffers from './use-fetch-favorite-offers';
import { fetchFavoriteOffersAction } from '../store/api-actions';

const mocks = vi.hoisted(() => ({
  useAppSelector: vi.fn(),
  fetchFavoriteOffersAction: vi.fn(),
}));

vi.mock('../store/api-actions', () => ({
  fetchFavoriteOffersAction: mocks.fetchFavoriteOffersAction,
}));

vi.mock('./use-app-selector', () => ({
  useAppDispatch: () => () => ({ abort: vi.fn() }),
  useAppSelector: mocks.useAppSelector,
}));

describe('Hook: useFetchFavoriteOffers', () => {
  beforeEach(() => {
    mocks.fetchFavoriteOffersAction.mockReset();
  });

  afterAll(() => {
    mocks.useAppSelector.mockReset();
    mocks.fetchFavoriteOffersAction.mockReset();
  });

  it('should dispatch fetchFavoriteOffersAction on mount if user is authorized', () => {
    mocks.useAppSelector.mockReturnValue(true);
    renderHook(() => useFetchFavoriteOffers());
    expect(fetchFavoriteOffersAction).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch fetchFavoriteOffersAction on mount if user is unauthorized', () => {
    mocks.useAppSelector.mockReturnValue(false);
    renderHook(() => useFetchFavoriteOffers());
    expect(fetchFavoriteOffersAction).not.toHaveBeenCalled();
  });
});
