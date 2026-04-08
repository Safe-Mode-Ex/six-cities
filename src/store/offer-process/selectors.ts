import { State } from '../../types';
import { NameSpace } from '../../enums';

export const selectOfferDetails = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].offerDetails;
export const selectOfferReviews = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].offerReviews;
export const selectNearbyOffers = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].nearbyOffers;
