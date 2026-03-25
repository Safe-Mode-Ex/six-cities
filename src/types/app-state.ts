import { SortType } from '../enums';
import { store } from '../store/store';
import { AuthorizationStatus } from './authorization-status';
import { Offer, OfferDetails } from './offer';
import { Review } from './review';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type OffersProcess = {
  city: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  sortType: SortType;
};

export type OfferDetailsProcess = {
  offerDetails: OfferDetails | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
