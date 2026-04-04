import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../types/app-route';
import { memo } from 'react';
import cn from 'classnames';
import { PlaceImageSize, Rating } from '../../enums';
import useHandleBookmarkButtonClick from '../../hooks/use-handle-bookmark-button-click';

type OfferCardProps = {
  offer: Offer;
  onHover: (offerId: string | null) => void;
  isFavoritesScreen?: boolean;
  isOfferScreen?: boolean;
};

function OfferCard({
  offer,
  onHover,
  isFavoritesScreen = false,
  isOfferScreen = false
}: OfferCardProps): JSX.Element {
  const handleBookmarkButtonClick = useHandleBookmarkButtonClick();
  const handleCardHover = (offerId: string | null) => () => onHover(offerId);

  return (
    <article
      className={cn(
        'place-card',
        { 'favorites__card': isFavoritesScreen },
        { 'near-places__card': isOfferScreen },
        { 'cities__card': !isFavoritesScreen && !isOfferScreen },
      )}
      data-testid="offer-card"
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={
          cn(
            'place-card__image-wrapper',
            { 'favorites__image-wrapper': isFavoritesScreen },
            { 'near-places__image-wrapper': isOfferScreen },
            { 'cities__image-wrapper': !isFavoritesScreen && !isOfferScreen },
          )
        }
        data-testid="card-image-wrapper"
      >
        <a
          href="#"
          onMouseEnter={handleCardHover(offer.id)}
          onMouseLeave={handleCardHover(null)}
          data-testid="image-link"
        >
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoritesScreen ? PlaceImageSize.WidthSmall : PlaceImageSize.WidtDefault}
            height={isFavoritesScreen ? PlaceImageSize.HeightSmall : PlaceImageSize.HeightDefault}
            alt="Place image"
          />
        </a>
      </div>
      <div
        className={`${isFavoritesScreen && 'favorites__card-info '}place-card__info`}
        data-testid="card-info"
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b
              className="place-card__price-value"
              data-testid="offer-price"
            >&euro;{offer.price}&nbsp;
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button button',
              { 'place-card__bookmark-button--active': offer.isFavorite }
            )}
            type="button"
            onClick={handleBookmarkButtonClick(offer.id, offer.isFavorite)}
            data-testid="bookmark-button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${offer.rating * Rating.StarsWidth}%` }}
              data-testid="rating-stars"
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" data-testid="card-name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" data-testid="offer-type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedOfferCard = memo(OfferCard);

export default MemoizedOfferCard;
