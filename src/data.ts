import { Place } from './types/place.type';

export const PLACES: Place[] = [{
  id: 1,
  image: 'img/apartment-01.jpg',
  price: 120,
  rating: 4,
  name: 'Beautiful & luxurious apartment at great location',
  type: 'Apartment',
  isPremium: true,
  isFavorite: false,
}, {
  id: 2,
  image: 'img/room.jpg',
  price: 80,
  rating: 4,
  name: 'Wood and stone place',
  type: 'Room',
  isPremium: false,
  isFavorite: true,
}, {
  id: 3,
  image: 'img/apartment-02.jpg',
  price: 132,
  rating: 4,
  name: 'Canal View Prinsengracht',
  type: 'Apartment',
  isPremium: false,
  isFavorite: false,
}, {
  id: 4,
  image: 'img/apartment-03.jpg',
  price: 180,
  rating: 5,
  name: 'Nice, cozy, warm big bed apartment',
  type: 'Apartment',
  isPremium: true,
  isFavorite: false,
}, {
  id: 5,
  image: 'img/room.jpg',
  price: 80,
  rating: 4,
  name:'Wood and stone place',
  type:'Room',
  isPremium: false,
  isFavorite: true,
}];

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
