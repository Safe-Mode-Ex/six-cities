import { getDefaultSortTypes } from '../helpers';
import { AuthorizationStatus } from '../types/authorization-status';
import { AppState } from '../types/state';

export const initialState: AppState = {
  city: '',
  offers: [],
  sortType: getDefaultSortTypes()[0],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isOffersDataLoading: false,
  offerDetails: null,
  offerReviews: [],
  nearbyOffers: [],
};
