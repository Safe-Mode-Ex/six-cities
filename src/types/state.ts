import { SortType } from '../enums';
import { AuthorizationStatus } from './authorization-status';
import { Offer } from './offer';

export type AppState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  activeOfferId: number | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
};
