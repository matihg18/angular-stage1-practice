import { createAction, props } from '@ngrx/store';
import { Post } from '../post';

export const loadPostsRequested = createAction(
    '[Post list] request all posts'
);

export const loadPostsSuccess = createAction(
    '[Post list] load posts success',
    props<{ posts: Post[] }>()
);

export const getPostByIdRequested = createAction(
    '[Post form] request post by id',
    props<{ id: number }>()
);

export const getPostByIdSuccess = createAction(
    '[Post form] get post by id success',
    props<{ post: Post }>()
);

export const getPostByIdFailure = createAction(
    '[Post form] get post by id failure',
    props<{ error: string }>()
);

export const updatePostRequested = createAction(
    '[Post form] update the current post',
    props<{ id: number, changes: Partial<Post> }>()
);

export const updatePostSuccess = createAction(
    '[Post form] update post success',
    props<{ post: Post }>()
);

export const updatePostFailure = createAction(
    '[Post form] update post failure',
    props<{ error: string }>()
);

export const createPostRequested = createAction(
    '[Post form] create new post requested',
    props<{ post: Post }>()
);

export const createPostSuccess = createAction(
    '[Post form] create new post success',
    props<{ post: Post }>()
);

export const createPostFailure = createAction(
    '[Post form] create nre post failure',
    props<{ error: string }>()
);


