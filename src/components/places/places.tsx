import { Place } from '../../types/place.type';
import PlaceCard from '../place-card/place-card';
import Sort from '../sort/sort';

type PlacesProps = {
  places: Place[];
};

function Places({places}: PlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{places.length} places to stay in Amsterdam</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {places.map((place) => (
          <PlaceCard key={`${place.id}`} place={place} />
        ))}
      </div>
    </section>
  );
}

export default Places;
