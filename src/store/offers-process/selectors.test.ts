import { NameSpace, SortType } from '../../enums';
import { getFakeOffers } from '../../utils/mocks';
import { selectIsOffersDataLoading, selectOffers, selectSortType } from './selectors';

describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: getFakeOffers(),
      sortType: SortType.POPULAR,
      isOffersLoading: true,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = selectOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return sortType from state', () => {
    const { sortType } = state[NameSpace.Offers];
    const result = selectSortType(state);
    expect(result).toEqual(sortType);
  });

  it('should return sortType from state', () => {
    const { isOffersLoading } = state[NameSpace.Offers];
    const result = selectIsOffersDataLoading(state);
    expect(result).toEqual(isOffersLoading);
  });
});
