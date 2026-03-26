import { memo } from 'react';
import { CITIES } from '../../const';

type LocationProps = {
    city: typeof CITIES[number];
    isActive: boolean;
    onCityClick: (city: string) => void;
}

function Location({ city, isActive, onCityClick }: LocationProps): JSX.Element {
  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onCityClick(city);
  };

  return (
    <li className="locations__item" key={city}>
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

const MemoizedLocation = memo(Location);

export default MemoizedLocation;
