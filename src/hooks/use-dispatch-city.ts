import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { CITIES } from '../const';
import { selectCity } from '../store/offers-process/offers-process';

function useDispatchCity(): void {
  const dispatch = useAppDispatch();
  const activeCityName = CITIES[0];

  useEffect(() => {
    dispatch(selectCity(activeCityName));
  }, [dispatch, activeCityName]);
}

export default useDispatchCity;
