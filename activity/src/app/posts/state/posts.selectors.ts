import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_STATE_KEY, PostState } from './posts.reducer';

export const getPostState = createFeatureSelector<PostState>(POST_STATE_KEY);

export const getPosts = createSelector(
    getPostState,
    state => state?.posts ?? []
);

export const getPostsLoaded = createSelector(
    getPostState,
    state => state.loaded
);

export const getEditingPost = createSelector(
    getPostState,
    state => state.editingPost
);

export const getPostsCount = createSelector(
    getPosts,
    posts => posts.length
);