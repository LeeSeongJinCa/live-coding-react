import { IPost } from '../../types';

interface PostListProps {
  posts: IPost[];
}

export const PostList = ({ posts }: PostListProps) => {
  return posts.map((post) => (
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
  ));
};
