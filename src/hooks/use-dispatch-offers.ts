import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { fetchOffersAction } from '../store/api-actions';

function useDispatchOffers() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);
}

export default useDispatchOffers;
