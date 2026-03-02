import { Place } from '../../types/place.type';
import MainScreen from './../../pages/main-screen/main-screen';

type AppProps = {
  places: Place[];
};

function App({places}: AppProps): JSX.Element {
  return (
    <MainScreen places={places} />
  );
}

export default App;
