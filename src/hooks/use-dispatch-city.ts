import { useEffect } from 'react';
import { CITIES } from '../mocks/cities';
import { selectCity } from '../store/action';
import { useAppDispatch } from './use-app-selector';

function useDispatchCity(): void {
  const dispatch = useAppDispatch();
  const activeCityName = CITIES[0];

  useEffect(() => {
    dispatch(selectCity(activeCityName));
  }, [dispatch, activeCityName]);
}

export default useDispatchCity;
