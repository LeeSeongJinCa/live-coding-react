import { useEffect, useState } from 'react';

import { API_ROUTES } from '../../shared/constants/api-routes';
import { useLoading } from '../../shared/hooks/useLoading';
import { IComment } from '../../types';

export const useComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  useEffect(() => {
    startLoading();
    fetch(API_ROUTES.comments.GET, {
      method: 'GET',
    })
      .then<IComment[]>((res) => res.json())
      .then((comments) => setComments(comments))
      .finally(() => stopLoading());
  }, []);

  return [comments, isLoading] as const;
};
