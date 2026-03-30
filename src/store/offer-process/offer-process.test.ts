import { OfferDetails } from '../../types/offer';
import { getFakeOfferDetails } from '../../utils/mocks';
import { offerProcess, setOfferDetails } from './offer-process';

describe('OfferProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offerDetails: {} as OfferDetails,
      offerReviews: [],
      nearbyOffers: [],
    };

    const result = offerProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offerDetails: null,
      offerReviews: [],
      nearbyOffers: [],
    };

    const result = offerProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set offer details with setOfferDetails action', () => {
    const initialState = {
      offerDetails: null,
      offerReviews: [],
      nearbyOffers: [],
    };
    const offerDetails = getFakeOfferDetails();

    const result = offerProcess.reducer(initialState, setOfferDetails(offerDetails));

    expect(result.offerDetails).toEqual(offerDetails);
  });
});
