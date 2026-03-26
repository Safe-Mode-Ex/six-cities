import { memo } from 'react';

type OfferGalleryContainerProps = {
    images: string[];
}

function OfferGalleryContainer({ images }: OfferGalleryContainerProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((src) => (
          <div className="offer__image-wrapper" key={src}>
            <img className="offer__image" src={src} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

const MemoizedOfferGalleryContainer = memo(OfferGalleryContainer);

export default MemoizedOfferGalleryContainer;
