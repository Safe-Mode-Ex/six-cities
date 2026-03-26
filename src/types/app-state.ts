import { SortType } from '../enums';
import { store } from '../store/store';
import { AuthorizationStatus } from './authorization-status';
import { CityOffersGroup, Offer, OfferDetails } from './offer';
import { Review } from './review';
import { UserData } from './user-data';

export type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type OffersState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
};

export type OfferDetailsState = {
  offerDetails: OfferDetails | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
}

export type FavoriteState = {
  favorite: CityOffersGroup;
  favoriteOffersCount: number;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
