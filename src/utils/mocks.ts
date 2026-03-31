import { CITIES } from '../const';
import { Offer, OfferDetails } from '../types/offer';
import { name, datatype, lorem, commerce, internet, image } from 'faker';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';

export const getFakeOfferDetails = (): OfferDetails => ({
  id: datatype.uuid(),
  title: name.title(),
  type: 'Hotel',
  price: datatype.number(),
  city: {
    name: CITIES[datatype.number({ min: 0, max: CITIES.length - 1 })],
    location: {
      latitude: datatype.float({ min: -90, max: 90 }),
      longitude: datatype.float({ min: -180, max: 180 }),
      zoom: datatype.number({ min: 1, max: 20 }),
    },
  },
  location: {
    latitude: datatype.float({ min: -90, max: 90 }),
    longitude: datatype.float({ min: -180, max: 180 }),
    zoom: datatype.number({ min: 1, max: 20 }),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float({ min: 0, max: 5 }),
  description: lorem.sentence(),
  bedrooms: datatype.number({ min: 1, max: 10 }),
  goods: [commerce.product(), commerce.product(), commerce.product()],
  host: {
    name: name.findName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  images: [image.imageUrl(), image.imageUrl(), image.imageUrl()],
  maxAdults: datatype.number({ min: 1, max: 10 }),
});

export const getFakeOffers = (): Offer[] => ([
  {
    id: datatype.uuid(),
    title: name.title(),
    type: 'Hotel',
    price: datatype.number(),
    city: {
      name: CITIES[datatype.number({ min: 0, max: CITIES.length - 1 })],
      location: {
        latitude: datatype.float({ min: -90, max: 90 }),
        longitude: datatype.float({ min: -180, max: 180 }),
        zoom: datatype.number({ min: 1, max: 20 }),
      },
    },
    location: {
      latitude: datatype.float({ min: -90, max: 90 }),
      longitude: datatype.float({ min: -180, max: 180 }),
      zoom: datatype.number({ min: 1, max: 20 }),
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.float({ min: 0, max: 5 }),
    previewImage: image.imageUrl(),
  }
]);

export const getFakeReviews = (): Review[] => ([
  {
    id: datatype.uuid(),
    date: datatype.datetime.toString(),
    user: {
      name: name.firstName(),
      isPro: datatype.boolean(),
      avatarUrl: image.avatar(),
    },
    comment: lorem.sentence(),
    rating: datatype.number(),
  }
]);


export const getFakeFavorite = (): Offer[] => getFakeOffers().map((item) => ({ ...item, isFavorite: true }));

export const getFakeUser = (): UserData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
});
