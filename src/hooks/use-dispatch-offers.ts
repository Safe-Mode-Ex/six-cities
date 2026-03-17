import { useEffect } from 'react';
import { OFFERS } from '../mocks/offers';
import { setOffers } from '../store/action';
import { useAppDispatch } from './use-app-selector';

function useDispatchOffers(activeCityName: string): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cityOffers = OFFERS.filter(({ city }) => city.name === activeCityName);
    dispatch(setOffers(cityOffers));
  }, [dispatch, activeCityName]);
}

export default useDispatchOffers;
