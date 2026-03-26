import { useEffect } from 'react';
import { fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction } from '../store/api-actions';
import { OfferDetails } from '../types/offer';
import { useAppDispatch } from './use-app-selector';
import { setOfferDetails } from '../store/offer/offer';

function useOfferData(
  activeOfferId: string,
  offerDetails: OfferDetails | null,
): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferByIdAction(activeOfferId));

    return () => {
      dispatch(setOfferDetails(null));
    };
  }, [activeOfferId, dispatch]);

  useEffect(() => {
    if (offerDetails) {
      dispatch(fetchCommentsAction(activeOfferId));
      dispatch(fetchNearbyOffers(activeOfferId));
    }
  }, [activeOfferId, dispatch, offerDetails]);
}

export default useOfferData;
