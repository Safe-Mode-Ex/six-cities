import { NameSpace, OfferDetailsMaxCount } from '../../enums';
import { getFakeOfferDetails, getFakeOffers, getFakeReviews } from '../../utils';
import { selectNearbyOffers, selectOfferDetails, selectOfferReviews } from './selectors';

describe('OfferProcess selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offerDetails: getFakeOfferDetails(),
      offerReviews: getFakeReviews(),
      nearbyOffers: getFakeOffers(),
    }
  };

  it('should return offer details from state', () => {
    const { offerDetails } = state[NameSpace.Offer];
    const expectedOfferDetails = {
      ...offerDetails,
      images: offerDetails.images.slice(0, OfferDetailsMaxCount.Images),
    };

    const result = selectOfferDetails(state);

    expect(result).toEqual(expectedOfferDetails);
  });

  it('should return offer details from state', () => {
    const { offerReviews } = state[NameSpace.Offer];
    const expectedOfferReviews = offerReviews.slice(0, OfferDetailsMaxCount.Reviews)
      .sort((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date));

    const result = selectOfferReviews(state);

    expect(result).toEqual(expectedOfferReviews);
  });

  it('should return offer details from state', () => {
    const { nearbyOffers } = state[NameSpace.Offer];
    const result = selectNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });
});
