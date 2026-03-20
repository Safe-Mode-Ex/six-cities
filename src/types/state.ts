import { SortType } from '../enums';
import { AuthorizationStatus } from './authorization-status';
import { Offer, OfferDetails } from './offer';
import { UserData } from './user-data';

export type AppState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  activeOfferId: number | null;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  isOffersDataLoading: boolean;
  offerDetails: OfferDetails | null;
};
