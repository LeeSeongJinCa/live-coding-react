import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', async () => {
    await delay(500);
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: 'Title 1',
        body: 'Body 1',
      },
      {
        userId: 1,
        id: 2,
        title: 'Title 2',
        body: 'Body2\nBody2',
      },
    ]);
  }),
];
