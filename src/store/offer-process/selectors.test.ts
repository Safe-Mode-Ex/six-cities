import { NameSpace } from '../../enums';
import { getFakeOfferDetails, getFakeOffers, getFakeReviews } from '../../utils/mocks';
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
    const result = selectOfferDetails(state);
    expect(result).toEqual(offerDetails);
  });

  it('should return offer details from state', () => {
    const { offerReviews } = state[NameSpace.Offer];
    const result = selectOfferReviews(state);
    expect(result).toEqual(offerReviews);
  });

  it('should return offer details from state', () => {
    const { nearbyOffers } = state[NameSpace.Offer];
    const result = selectNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });
});
