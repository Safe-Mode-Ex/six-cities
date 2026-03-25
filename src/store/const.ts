import { getDefaultSortTypes } from '../helpers';
import { AppState } from '../types/state';

export const initialState: AppState = {
  city: '',
  offers: [],
  sortType: getDefaultSortTypes()[0],
  user: null,
  isOffersDataLoading: false,
  offerDetails: null,
  offerReviews: [],
  nearbyOffers: [],
};
