/**
 * 4. Fetch Data from an API
 *
 * Problem:
 * - Create a component fetching data from an API and displaying it in a list.
 * - API에서 데이터를 가져와 목록에 표시하는 컴포넌트를 만듭니다.
 */

import { useEffect, useState } from 'react';

import { API_ROUTES } from '../../shared/constants/api-routes';
import { IPost } from '../../types';

export const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_ROUTES.posts.GET, {
      method: 'GET',
    })
      .then<IPost[]>((res) => res.json())
      .then((posts) => setPosts(posts))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <ul>
        {isLading ? (
          <li>Loading...</li>
        ) : (
          posts.map((post) => (
            <li
              key={post.id}
              id={`${post.id}`}
              className="post-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                columnGap: 4,
                margin: '12px 0',
              }}
            >
              <p id="post-id">ID: {post.id}</p>
              <p id="post-title">Title: {post.title}</p>
              <p id="post-body" style={{ whiteSpace: 'pre' }}>
                Body: {post.body}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
