export type OfferLocation ={
    latitude: number;
    longitude: number;
    zoom: number;
}

export type OfferCity = {
    name: string;
    location: OfferLocation;
}

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: OfferCity;
    location: OfferLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};

export type OfferDetails = Omit<Offer, 'previewImage'> & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: {
        name: string;
        isPro: boolean;
        avatarUrl: string;
    };
    images: string[];
    maxAdults: number;
}

export type OfferMapPoint = OfferCity & Pick<Offer, 'id'>;
