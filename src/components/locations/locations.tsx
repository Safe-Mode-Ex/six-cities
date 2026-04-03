import { memo, useCallback } from 'react';
import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-selector';
import { selectCity } from '../../store/offers-process/offers-process';
import Location from '../location/location';

function Locations(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = useCallback(
    (city: string) => {
      dispatch(selectCity(city));
    },
    [dispatch],
  );

  return (
    <section className="locations container" data-testid="locations-container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <Location
            key={city}
            city={city}
            onCityClick={handleCityClick}
          />
        ))}
      </ul>
    </section>
  );
}

const MemoizedLocations = memo(Locations);

export default MemoizedLocations;
