import { useEffect, useState } from 'react';

import { API_ROUTES } from '../../shared/constants/api-routes';
import { IComment } from '../../types';

export const useComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_ROUTES.comments.GET, {
      method: 'GET',
    })
      .then<IComment[]>((res) => res.json())
      .then((comments) => setComments(comments))
      .finally(() => setIsLoading(false));
  }, []);

  return [comments, isLoading] as const;
};
