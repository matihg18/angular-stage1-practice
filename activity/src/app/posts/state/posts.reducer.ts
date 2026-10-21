import { createReducer, on, Action } from '@ngrx/store';
import { Post } from '../post';
import { createPostSuccess, getPostByIdRequested, getPostByIdSuccess, loadPostsSuccess, updatePostRequested, updatePostSuccess } from './posts.actions';

export const POST_STATE_KEY = 'posts';

export interface PostState {
    posts: Post[];
    editingPost: Post | null;
    loaded: boolean;
};

export const initialState: PostState = {
    posts: [],
    editingPost: null,
    loaded: false
};

const postReducer = createReducer(
    initialState,
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts,
            loaded: true
        };
    }),
    on(getPostByIdRequested, state => ({
        ...state,
        editingPost: null
    })),
    on(getPostByIdSuccess, (state, action) => {
        return {
            ...state,
            editingPost: action.post
        }
    }),
    on(updatePostSuccess, (state, action) => {
        return {
            ...state,
            posts: state.posts.map(p => p.id === action.post.id ? action.post : p)
        }
    }),
    on(createPostSuccess, (state, action) => {
        return {
            ...state,
            posts: [...state.posts, action.post]
        }
    }) 
);
export function reducer (state: PostState, action: Action){
    return postReducer(state, action);
}