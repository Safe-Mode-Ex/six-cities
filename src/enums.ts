export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer',
    NotFound = '/not-found',
}

export enum SortType {
    Popular = 'Popular',
    PriceLowToHigh = 'Price: low to high',
    PriceHighToLow = 'Price: high to low',
    TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
    Offers = '/offers',
    Comments = '/comments',
    Login = '/login',
    Logout = '/logout',
    Favorite = '/favorite',
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
} as const;

export const Rating = {
  StarsWidth: 20,
  MaxValue: 5,
} as const;

export enum NameSpace {
  User = 'user',
  Offers = 'offers',
  Offer = 'offer',
  Favorite = 'favorite',
}

export enum FavoriteStatus {
  Disabled = 0,
  Enabled = 1,
}
