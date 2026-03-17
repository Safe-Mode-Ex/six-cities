import { useAppDispatch } from '../../hooks/use-app-selector';
import { selectCity } from '../../store/action';

type LocationsProps = {
  cities: string[];
  activeCity: string;
};

function Locations({cities, activeCity}: LocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const setSelectedCity = (city: string) => {
    dispatch(selectCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              onClick={() => setSelectedCity(city)}
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
