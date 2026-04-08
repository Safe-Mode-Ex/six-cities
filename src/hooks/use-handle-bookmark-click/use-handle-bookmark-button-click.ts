import { AppRoute } from '../../enums';
import { redirectToRoute } from '../../store/action';
import { changeFavoriteStateAction } from '../../store/api-actions/api-actions';
import { selectAuthorizedStatus } from '../../store/user-process/selector';
import { useAppDispatch, useAppSelector } from '../use-app-selector/use-app-selector';

function useHandleBookmarkButtonClick() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthorizedStatus);

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
