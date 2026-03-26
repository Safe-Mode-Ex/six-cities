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
    let isMount = true;

    if (isMount) {
      dispatch(fetchOfferByIdAction(activeOfferId));
    }

    return () => {
      isMount = false;
      dispatch(setOfferDetails(null));
    };
  }, [activeOfferId, dispatch]);

  useEffect(() => {
    let isMount = true;

    if (isMount && offerDetails) {
      dispatch(fetchCommentsAction(activeOfferId));
      dispatch(fetchNearbyOffers(activeOfferId));
    }

    return () => {
      isMount = false;
    };
  }, [activeOfferId, dispatch, offerDetails]);
}

export default useOfferData;
