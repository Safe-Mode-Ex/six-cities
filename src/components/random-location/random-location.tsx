import { CITIES } from '../../const';
import { getRandomInRange } from '../../utils';
import Location from '../location/location.tsx';

function RandomLocation(): JSX.Element {
  const randomCityIndex = getRandomInRange(0, CITIES.length);

  return (
    <section
      className="locations locations--login locations--current"
      data-testid="current-location"
    >
      <Location city={CITIES[randomCityIndex]} />
    </section>
  );
}

export default RandomLocation;
