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
