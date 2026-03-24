export enum SortType {
    POPULAR = 'Popular',
    PRICE_LOW_TO_HIGH = 'Price: low to high',
    PRICE_HIGH_TO_LOW = 'Price: high to low',
    TOP_RATED_FIRST = 'Top rated first',
}

export enum APIRoute {
    Offers = '/offers',
    Comments = '/comments',
    Login = '/login',
    Logout = '/logout',
}

export enum Leaflet {
    Template = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}

export const ReviewText = {
  MinLength: 50,
  MaxLength: 300,
} as const;

export const MarkerUrl = {
  Default: '/img/pin.svg',
  Active: '/img/pin-active.svg',
} as const;

export const PlaceImageSize = {
  WidthSmall: 150,
  WidtDefault: 260,
  HeightSmall: 110,
  HeightDefault: 200,
};

export const Rating = {
  StarsWidth: 20,
  MaxValue: 5,
};
