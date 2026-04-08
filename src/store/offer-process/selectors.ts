import { createSelector } from '@reduxjs/toolkit';
import { OfferDetails, Review, State } from '../../types';
import { NameSpace, OfferDetailsMaxCount } from '../../enums';

export const selectOfferDetails = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerDetails,
  (offerDetails: OfferDetails | null) => (offerDetails ? {
    ...offerDetails,
    images: offerDetails.images.slice(0, OfferDetailsMaxCount.Images),
  } : null),
);

export const selectOfferReviews = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerReviews,
  (offerReviews: Review[]) => offerReviews
    .slice(0, OfferDetailsMaxCount.Reviews)
    .sort((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date))
);

export const selectNearbyOffers = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].nearbyOffers;
