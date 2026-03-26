import cn from 'classnames';
import useHandleBookmarkButtonClick from '../../hooks/use-handle-bookmark-button-click';

export type OfferNameWrapperProps = {
    offerId: string;
    title: string;
    isFavorite: boolean;
}

function OfferNameWrapper({ offerId, title, isFavorite }: OfferNameWrapperProps): JSX.Element {
  const handleBookmarkButtonClick = useHandleBookmarkButtonClick();

  return (
    <div className="offer__name-wrapper">
      <h1 className="offer__name">{title}</h1>
      <button
        className={cn(
          'offer__bookmark-button button',
          { 'offer__bookmark-button--active': isFavorite }
        )}
        type="button"
        onClick={handleBookmarkButtonClick(offerId, isFavorite)}
      >
        <svg className="offer__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
  );
}

export default OfferNameWrapper;
