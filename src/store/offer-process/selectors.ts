import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { NameSpace } from '../../enums';

export const getOfferDetails = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state,
  (state) => state[NameSpace.Offer].offerDetails
);

export const getOfferReviews = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state,
  (state) => state[NameSpace.Offer].offerReviews
);

export const getNearbyOffers = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state,
  (state) => state[NameSpace.Offer].nearbyOffers
);
