import { Offer, OfferDetails } from '../types/offer';

export const OFFERS: Offer[] = [{
  id: 1,
  type: 'Apartment',
  previewImage: 'img/apartment-01.jpg',
  price: 120,
  rating: 4,
  title: 'Beautiful & luxurious apartment at great location',
  isPremium: true,
  isFavorite: true,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 10,
  },
}, {
  id: 2,
  type: 'Room',
  previewImage: 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Wood and stone place',
  isPremium: false,
  isFavorite: false,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
  },
  location: {
    latitude: 52.3609553943508,
    longitude: 4.85309666406198,
    zoom: 10,
  },
}, {
  id: 3,
  type: 'Apartment',
  previewImage: 'img/apartment-02.jpg',
  price: 132,
  rating: 4,
  title: 'Canal View Prinsengracht',
  isPremium: false,
  isFavorite: false,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
    zoom: 10,
  },
}, {
  id: 4,
  type: 'Apartment',
  previewImage: 'img/apartment-03.jpg',
  price: 180,
  rating: 5,
  title: 'Nice, cozy, warm big bed apartment',
  isPremium: true,
  isFavorite: true,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10,
    },
  },
  location: {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 10,
  },
}, {
  id: 5,
  type: 'Room',
  previewImage: 'img/room.jpg',
  price: 80,
  rating: 4,
  title:'Wood and stone place',
  isPremium: false,
  isFavorite: true,
  city: {
    name: 'Brussels',
    location: {
      latitude: 51.8465573055142,
      longitude: 5.3516970028686,
      zoom: 10,
    },
  },
  location: {
    latitude: 50.8465573055142,
    longitude: 4.3516970028686,
    zoom: 10,
  },
}];

const offer = {...OFFERS[0]} as Omit<Offer, 'previewImage'>;

export const offerDetails: OfferDetails = {
  ...offer,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful`,
  bedrooms: 3,
  goods: [
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Heating',
    'Coffee machine',
    'Baby seat',
    'Kitchen',
    'Dishwasher',
    'Cabel TV',
    'Fridge'
  ],
  images: [
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
  ],
  host: {
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg',
  },
  maxAdults: 4,
};
