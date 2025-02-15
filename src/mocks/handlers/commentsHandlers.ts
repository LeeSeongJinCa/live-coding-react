import { delay, http, HttpResponse } from 'msw';

import { API_ROUTES } from '../../shared/constants/api-routes';
import { IComment } from '../../types';

export const commentsHandlers = [
  http.get(API_ROUTES.comments.GET, async () => {
    await delay(500);
    return HttpResponse.json(
      Array.from({ length: 10 }, (_, index) => ({
        postId: 1,
        id: index + 1,
        name: `Name ${index + 1}`,
        email: ['Eliseo@gardner.biz', 'Jayne_Kuhic@sydney.com'].at(index % 2),
        body: `Body${index + 1}\nBody${index + 1}`,
      })) as IComment[],
    );
  }),
];
