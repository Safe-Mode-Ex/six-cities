import { renderHook } from '@testing-library/react';
import { getFakeOffers } from '../utils/mocks';
import useCityOffers from './use-city-offers';

describe('Hook: useCityOffers', () => {
  it('should return filtered offers for active city', () => {
    const offers = getFakeOffers();
    const activeCityName = 'Amsterdam';

    const { result } = renderHook(() => useCityOffers(offers, activeCityName));

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current.every((offer) => offer.city.name === activeCityName)).toBe(true);
  });
});
