import { CITIES } from '../../mocks/cities';

type LocationsProps = {
  cities: string[];
  activeCity: string;
  selectCity: (cityName: string) => void;
};

function Locations({cities, activeCity, selectCity}: LocationsProps): JSX.Element {
  if (!activeCity) {
    selectCity(CITIES[0]);
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              onClick={() => selectCity(city)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
