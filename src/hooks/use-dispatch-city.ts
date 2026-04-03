import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { selectCity } from '../store/offers-process/offers-process';
import { CITIES } from '../const';

function useDispatchCity(city: string = CITIES[0]): void {
  const dispatch = useAppDispatch();
  const activeCityName = city;

  useEffect(() => {
    dispatch(selectCity(activeCityName));
  }, [dispatch, activeCityName]);
}

export default useDispatchCity;
