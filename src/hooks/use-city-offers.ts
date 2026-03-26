import { useMemo } from 'react';
import { Offer } from '../types/offer';

function useCityOffers(offers: Offer[], activeCityName: string) {
  return useMemo(
    () => offers.filter(({ city }) => city.name === activeCityName),
    [activeCityName, offers]
  );
}

export default useCityOffers;
