import { useEffect } from 'react';
import { fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction } from '../store/api-actions';
import { OfferDetails } from '../types/offer';
import { AppDispatch } from '../types/app-state';

function useOfferData(
  activeOfferId: string,
  offerDetails: OfferDetails | null,
  dispatch: AppDispatch
): void {
  useEffect(() => {
    let isMount = true;

    if (isMount && !offerDetails) {
      dispatch(fetchOfferByIdAction(activeOfferId));
    }

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
