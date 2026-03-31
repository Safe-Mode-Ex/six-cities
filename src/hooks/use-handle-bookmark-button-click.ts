import { redirectToRoute } from '../store/action';
import { changeFavoriteStateAction } from '../store/api-actions';
import { getAuthorizedStatus } from '../store/user-process/selector';
import { AppRoute } from '../types/app-route';
import { useAppDispatch, useAppSelector } from './use-app-selector';

function useHandleBookmarkButtonClick() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getAuthorizedStatus);

  return (offerId: string, isFavorite: boolean) => ((evt: React.MouseEvent) => {
    evt.preventDefault();

    if (isAuthorized) {
      dispatch(changeFavoriteStateAction({
        offerId,
        status: Number(!isFavorite),
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  });
}

export default useHandleBookmarkButtonClick;
