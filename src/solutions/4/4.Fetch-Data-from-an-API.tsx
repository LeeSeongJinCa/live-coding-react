/**
 * 4. Fetch Data from an API
 *
 * Problem:
 * - Create a component fetching data from an API and displaying it in a list.
 * - API에서 데이터를 가져와 목록에 표시하는 컴포넌트를 만듭니다.
 */

import { useEffect, useState } from 'react';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: boolean;
}

export const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then<IPost[]>((res) => res.json())
      .then((posts) => setPosts(posts));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
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
        ))}
      </ul>
    </div>
  );
};
