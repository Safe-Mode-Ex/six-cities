import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-selector';
import { selectCity } from '../../store/action';

type LocationsProps = {
  activeCity: string;
};

function Locations({ activeCity }: LocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSelectCityClick = (city: string) => {
    dispatch(selectCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              onClick={() => handleSelectCityClick(city)}
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
