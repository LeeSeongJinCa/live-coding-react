import { useEffect, useState } from 'react';

import { API_ROUTES } from '../../shared/constants/api-routes';
import { useLoading } from '../../shared/hooks/useLoading';
import { IPost } from '../../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  useEffect(() => {
    startLoading();
    fetch(API_ROUTES.posts.GET, {
      method: 'GET',
    })
      .then<IPost[]>((res) => res.json())
      .then((posts) => setPosts(posts))
      .finally(() => stopLoading());
  }, []);

  return [posts, isLoading] as const;
};
