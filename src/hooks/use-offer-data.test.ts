import { renderHook } from '@testing-library/react';
import useOfferData from './use-offer-data';
import { OfferDetails } from '../types/offer';

const mocks = vi.hoisted(() => ({
  dispatchMock: vi.fn(),
  fetchOfferByIdActionMock: vi.fn(),
  fetchCommentsActionMock: vi.fn(),
  fetchNearbyOffersActionMock: vi.fn(),
  setOfferDetails: vi.fn(),
}));

vi.mock('./use-app-selector', () => ({
  useAppDispatch: () => mocks.dispatchMock,
}));
vi.mock('../store/api-actions', () => ({
  fetchOfferByIdAction: mocks.fetchOfferByIdActionMock,
  fetchCommentsAction: mocks.fetchCommentsActionMock,
  fetchNearbyOffersAction: mocks.fetchNearbyOffersActionMock,
}));
vi.mock('../store/offer-process/offer-process', () => ({
  setOfferDetails: mocks.setOfferDetails,
}));

describe('Hook: useOfferData', () => {
  afterAll(() => {
    mocks.dispatchMock.mockReset();
    mocks.fetchOfferByIdActionMock.mockReset();
    mocks.fetchCommentsActionMock.mockReset();
    mocks.fetchNearbyOffersActionMock.mockReset();
    mocks.setOfferDetails.mockReset();
  });

  it('should dispatch fetchOfferByIdAction on mount and setOfferDetails with null on unmount', () => {
    const activeOfferId = '1';
    const offerDetails = null;

    const { unmount } = renderHook(() => useOfferData(activeOfferId, offerDetails));
    unmount();

    expect(mocks.fetchOfferByIdActionMock).toHaveBeenCalledWith(activeOfferId);
    expect(mocks.setOfferDetails).toHaveBeenCalledWith(null);
  });

  it('should dispatch fetchCommentsAction and fetchNearbyOffersAction when offerDetails is not null', () => {
    const activeOfferId = '1';
    const offerDetails = { id: '1' } as unknown as OfferDetails;

    renderHook(() => useOfferData(activeOfferId, offerDetails));

    expect(mocks.fetchCommentsActionMock).toHaveBeenCalledWith(activeOfferId);
    expect(mocks.fetchNearbyOffersActionMock).toHaveBeenCalledWith(activeOfferId);
  });
});
