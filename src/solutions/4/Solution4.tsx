/**
 * 4. Fetch Data from an API
 *
 * Problem:
 * - Create a component fetching data from an API and displaying it in a list.
 * - API에서 데이터를 가져와 목록에 표시하는 컴포넌트를 만듭니다.
 */

import { PostList } from './PostList';
import { usePosts } from './usePosts';

export const Solution4 = () => {
  const [posts, isLoading] = usePosts();

  return (
    <div>
      <ul>{isLoading ? <li>Loading...</li> : <PostList posts={posts} />}</ul>
    </div>
  );
};
