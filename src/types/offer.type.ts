type Offerfeatures = {
    type: string;
    bedrooms: number;
    adults: number;
}

export type Offer = {
    id: number;
    image: string;
    price: number;
    rating: number;
    name: string;
    isPremium: boolean;
    isFavorite: boolean;
    features: Offerfeatures;
    amenities: string[];
    description: string[];
    city: string;
};
