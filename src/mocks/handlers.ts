import { commentsHandlers } from './handlers/commentsHandlers';
import { postHandlers } from './handlers/postsHandlers';

export const handlers = [...postHandlers, ...commentsHandlers];
