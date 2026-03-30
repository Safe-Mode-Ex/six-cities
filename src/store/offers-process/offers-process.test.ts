import { OfferDetails } from '../../types/offer';
import { getDefaultSortTypes } from '../../utils/helpers';
import { getFakeOffers } from '../../utils/mocks';
import { changeFavoriteStateAction, fetchOffersAction, logoutAction } from '../api-actions';
import { offersSlice, selectCity, setSortType } from './offers-process';

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: '',
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: '',
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with selectCity action', () => {
    const expectedCity = 'Amsterdam';

    const result = offersSlice.reducer(undefined, selectCity(expectedCity));

    expect(result.city).toEqual(expectedCity);
  });

  it('should change sortType with setSorttype action', () => {
    const initialState = {
      city: '',
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const expectedSortType = getDefaultSortTypes()[1];

    const result = offersSlice.reducer(initialState, setSortType(expectedSortType));

    expect(result.sortType).toEqual(expectedSortType);
  });

  it('should set isOffersLoading to true with fetchOffersAction.pending', () => {
    const expectedState = {
      city: '',
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: true,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to false with fetchOffersAction.rejected', () => {
    const expectedState = {
      city: '',
      offers: [],
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set offers to array with offers and isOffersLoading to false with fetchOffersAction.fulfilled',
    () => {
      const offersMock = getFakeOffers();
      const expectedState = {
        city: '',
        sortType: getDefaultSortTypes()[0],
        offers: offersMock,
        isOffersLoading: false,
      };

      const result = offersSlice
        .reducer(undefined, fetchOffersAction.fulfilled(offersMock, '', undefined));

      expect(result).toEqual(expectedState);
    });

  it('should change offers\'s isFavorite property with changeFavoriteStateAction.fulfilled', () => {
    const offersMock = getFakeOffers();
    const currentOfferIndex = 0;
    const currentOffer = offersMock[currentOfferIndex] as unknown as OfferDetails;
    const arg = { offerId: '', status: 0 };
    const expectedOffer = { ...offersMock[currentOfferIndex], isFavorite: !currentOffer.isFavorite };
    const initialState = {
      city: '',
      offers: offersMock,
      sortType: getDefaultSortTypes()[0],
      isOffersLoading: false,
    };
    const expectedState = {
      city: '',
      sortType: getDefaultSortTypes()[0],
      offers: offersMock.splice(currentOfferIndex, 1, expectedOffer),
      isOffersLoading: false,
    };

    const result = offersSlice
      .reducer(initialState, changeFavoriteStateAction.fulfilled(currentOffer, '', arg));

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

    const result = offersSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result.offers).toEqual(expectedOffers);
  });
});
