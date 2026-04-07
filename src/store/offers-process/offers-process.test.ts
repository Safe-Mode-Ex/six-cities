import { OfferDetails } from '../../types';
import { getDefaultSortTypes } from '../../utils';
import { getFakeOffers } from '../../utils';
import {
  changeFavoriteStateAction,
  fetchOffersAction,
  logoutAction
} from '../api-actions/api-actions';
import { offersProcess, setOffersLoading, setSortType } from './offers-process';

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };

    const result = offersProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: true,
    };

    const result = offersProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change sortType with setSorttype action', () => {
    const initialState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const expectedSortType = getDefaultSortTypes()[1];

    const result = offersProcess.reducer(initialState, setSortType(expectedSortType));

    expect(result.sortType).toBe(expectedSortType);
  });

  it('should change isOffersLoading with setOffersLoading action', () => {
    const initialState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const result = offersProcess.reducer(initialState, setOffersLoading(true));
    expect(result.isOffersLoading).toBe(true);
  });

  it('should set isOffersLoading to true with fetchOffersAction.pending', () => {
    const expectedState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: true,
    };

    const result = offersProcess.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to false with fetchOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };

    const result = offersProcess.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set offers to array with offers and isOffersLoading to false with fetchOffersAction.fulfilled',
    () => {
      const offersMock = getFakeOffers();
      const expectedState = {
        sortType: getDefaultSortTypes()[0],
        offers: offersMock,
        isOffersLoading: false,
      };

      const result = offersProcess
        .reducer(undefined, fetchOffersAction.fulfilled(offersMock, '', undefined));

      expect(result).toEqual(expectedState);
    });

  it('should change offers\'s isFavorite property with changeFavoriteStateAction.fulfilled', () => {
    const offersMock = getFakeOffers();
    const currentOfferIndex = 0;
    const currentOffer = offersMock[currentOfferIndex];
    const arg = { offerId: '', status: 0 };
    const expectedOffer = {
      ...offersMock[currentOfferIndex],
      isFavorite: !currentOffer.isFavorite
    } as unknown as OfferDetails;
    const initialState = {
      city: '',
      offers: offersMock,
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const expectedState = {
      city: '',
      sortType: getDefaultSortTypes()[0],
      offers: offersMock.map((offer, index) => index === currentOfferIndex ? expectedOffer : offer),
      isOffersLoading: false,
    };

    const result = offersProcess
      .reducer(initialState, changeFavoriteStateAction.fulfilled(expectedOffer, '', arg));

    expect(result).toEqual(expectedState);
  });

  it('should set isFavorite to false for all offers with logoutAction.fulfiled', () => {
    const offersMock = getFakeOffers();
    const initialState = {
      city: '',
      offers: offersMock.map((offer) => ({ ...offer, isFavorite: true })),
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const expectedOffers = offersMock.map((offer) => ({ ...offer, isFavorite: false }));

    const { offers } = offersProcess.reducer(initialState, logoutAction.fulfilled);

    expect(offers).toEqual(expectedOffers);
  });
});
