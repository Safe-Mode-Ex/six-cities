import { NameSpace, SortType } from '../../enums';
import { State } from '../../types';
import { getFakeOffers } from '../../utils';
import { selectCityOffers, selectIsOffersDataLoading, selectSortType } from './selectors';

describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: getFakeOffers(),
      sortType: SortType.POPULAR,
      isOffersLoading: true,
    }
  };

  it('should return offers from state', () => {
    const currentCity = 'Amsterdam';
    const result = selectCityOffers(state as State, currentCity);
    expect(result.every(({ city }) => city.name === currentCity));
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
