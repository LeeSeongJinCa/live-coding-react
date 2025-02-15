/**
 * 5. Create a Search Bar
 *
 * Problem:
 * - Create a search bar component that filters a list of items as the user types.
 * - 사용자가 입력하는 대로 항목 목록을 필터링하는 검색창 컴포넌트를 만듭니다.
 */

import { useState } from 'react';

import { CommentList } from './CommentList';
import { SearchBar } from './SearchBar';
import { useComments } from './useComments';

export const Solution5 = () => {
  const [comments, isLoading] = useComments();

  const [search, setSearch] = useState<string>('');

  const filteredComments = comments.filter((comment) => comment.name.includes(search));

  return (
    <div>
      <SearchBar onSearch={setSearch} />

      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          <CommentList comments={filteredComments} highlight={search} />
        )}
      </ul>
    </div>
  );
};
