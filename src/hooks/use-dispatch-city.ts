import { useEffect } from 'react';
import { selectCity } from '../store/action';
import { useAppDispatch } from './use-app-selector';
import { CITIES } from '../const';

function useDispatchCity(): void {
  const dispatch = useAppDispatch();
  const activeCityName = CITIES[0];

  useEffect(() => {
    dispatch(selectCity(activeCityName));
  }, [dispatch, activeCityName]);
}

export default useDispatchCity;
