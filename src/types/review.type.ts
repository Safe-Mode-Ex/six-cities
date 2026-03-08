type ReviewAuthor ={
    name: string;
    avatar: string;
}

export type Review = {
    id: number;
    author: ReviewAuthor;
    text: string;
    rating: number;
    date: string;
}

export type NewReview = {
    rating: number;
    text: string;
}
