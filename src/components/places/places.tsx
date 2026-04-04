import cn from 'classnames';
import NoPlaces from '../no-places/no-places';
import Offers from '../offers/offers';
import Map from '../map/map';
import { useCallback, useMemo, useState } from 'react';
import { Offer } from '../../types/offer';
import { getCityPoints } from '../../utils/helpers';

type PlacesProps = {
  activeCityName: string;
  cityOffers: Offer[];
}

function Places({ activeCityName, cityOffers }: PlacesProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const hasOffers = cityOffers.length;
  const cityLocation = hasOffers ? cityOffers[0].city.location : null;
  const points = useMemo(() => getCityPoints(cityOffers), [cityOffers]);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  return (
    <div className="cities">
      <div
        className={cn(
          'cities__places-container container',
          {
            'cities__places-container--empty': !hasOffers,
          }
        )}
        data-testid="places-container"
      >
        {hasOffers ?
          <Offers offers={cityOffers} handleOfferHover={handleOfferHover} /> :
          <NoPlaces city={activeCityName} />}
        <div className="cities__right-section">
          {cityLocation && !!points.length &&
            <Map
              location={cityLocation}
              points={points}
              activeOfferId={activeOfferId}
              extraClass='cities__map'
            />}
        </div>
      </div>
    </div>
  );
}

export default Places;
