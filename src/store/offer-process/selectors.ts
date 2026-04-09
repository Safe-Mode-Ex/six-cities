import { createSelector } from '@reduxjs/toolkit';
import { Offer, OfferDetails, Review, State } from '../../types';
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
  (offerReviews: Review[]) => [...offerReviews]
    .sort((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date))
    .slice(0, OfferDetailsMaxCount.Reviews),
);

export const selectNearbyOffers = createSelector(
  (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffers,
  (nearbyOffers: Offer[]) => nearbyOffers.slice(0, OfferDetailsMaxCount.NearbyOffers)
);

export const selectOfferReviewsCount = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].offerReviews.length;
