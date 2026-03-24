import { SortType } from '../enums';
import { AuthorizationStatus } from './authorization-status';
import { Offer, OfferDetails } from './offer';
import { NewReview, Review } from './review';
import { UserData } from './user-data';

export type AppState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  isOffersDataLoading: boolean;
  offerDetails: OfferDetails | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
  isCommentSending: boolean;
  reviewForm: NewReview;
};
