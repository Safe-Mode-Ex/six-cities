import { OfferDetails } from '../../types';
import { getFakeOfferDetails, getFakeOffers, getFakeReviews } from '../../utils';
import {
  changeFavoriteStateAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  logoutAction
} from '../api-actions/api-actions';
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
    const offerDetails = getFakeOfferDetails();

    const result = offerProcess.reducer(undefined, setOfferDetails(offerDetails));

    expect(result.offerDetails).toEqual(offerDetails);
  });

  it('should set offerDetails with fetchOfferByIdAction.fulfiled', () => {
    const expectedOfferDetails = getFakeOfferDetails();

    const result = offerProcess
      .reducer(undefined, fetchOfferByIdAction.fulfilled(expectedOfferDetails, '', ''));

    expect(result.offerDetails).toEqual(expectedOfferDetails);
  });

  it('should set offerReviews with fetchCommentsAction.fulfilled', () => {
    const expectedComments = getFakeReviews();

    const result = offerProcess
      .reducer(undefined, fetchCommentsAction.fulfilled(expectedComments, '', ''));

    expect(result.offerReviews).toEqual(expectedComments);
  });

  it('should set nearbyOffers with fetchNearbyOffers.fulfilled', () => {
    const expectedNearbyOffers = getFakeOffers();

    const result = offerProcess
      .reducer(undefined, fetchNearbyOffersAction.fulfilled(expectedNearbyOffers, '', ''));

    expect(result.nearbyOffers).toEqual(expectedNearbyOffers);
  });

  it('should change isFavorite for offer with changeFavoriteStateAction.fulfilled', () => {
    const offerDetails = getFakeOfferDetails();
    const arg = { offerId: '', status: 0 };
    const expectedOfferDetails = {
      ...offerDetails,
      isFavorite: !offerDetails.isFavorite,
    };

    const initialState = {
      offerDetails,
      offerReviews: [],
      nearbyOffers: [],
    };

    const result = offerProcess
      .reducer(initialState, changeFavoriteStateAction.fulfilled(expectedOfferDetails, '', arg));

    expect(result.offerDetails?.isFavorite).toEqual(expectedOfferDetails.isFavorite);
  });

  it('should set isFavorite to false with logoutAction.fulfilled', () => {
    const offerDetails = getFakeOfferDetails();
    const initialState = {
      offerDetails: {
        ...offerDetails,
        isFavorite: true,
      },
      offerReviews: [],
      nearbyOffers: [],
    };

    const result = offerProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result.offerDetails?.isFavorite).toBe(false);
  });
});
