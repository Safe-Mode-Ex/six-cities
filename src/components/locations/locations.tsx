import { memo } from 'react';
import { CITIES } from '../../const';
import Location from '../location/location';

function Locations(): JSX.Element {
  return (
    <section className="locations container" data-testid="locations-container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <Location key={city} city={city} />
        ))}
      </ul>
    </section>
  );
}

const MemoizedLocations = memo(Locations);

export default MemoizedLocations;
