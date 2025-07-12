export interface Ratings {
    id: string;
    user_id: string;
    rating: number;
    type: string;
    reference: string;
    created_at: Date;
    updated_at: Date
}

export interface RatingsPayload {
    rating: number;
    user_id: string;
    type: string;
    comment: string;
    reference: string;
}

export interface Comments {
    id: string;
    comment: string;
    reference: string;
    rating_id: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date
}

export interface CommentReplies {
    id: string;
    comment_id: string;
    reference: string;
    user_id: string;
    reply: string;
    created_at?: Date;
    updated_at?: Date
}

export interface RatingsWithComments extends Ratings {
    id: string;
    user_id: string;
    rating: number;
    type: string;
    reference: string;
    Comments?: Comments[];
    created_at: Date;
    updated_at: Date
}