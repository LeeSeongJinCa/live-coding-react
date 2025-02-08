/**
 * 5. Create a Search Bar
 *
 * Problem:
 * - Create a search bar component that filters a list of items as the user types.
 * - 사용자가 입력하는 대로 항목 목록을 필터링하는 검색창 컴포넌트를 만듭니다.
 */

import { useMemo, useState } from 'react';

import { HighlightText } from './HighlightText';
import { useComments } from './useComments';

export const SearchBar = () => {
  const [comments, isLoading] = useComments();

  const [search, setSearch] = useState<string>('');

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => comment.name.includes(search));
  }, [comments, search]);

  return (
    <div>
      <input
        id="text-input"
        type="text"
        placeholder="Todo Name"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />

      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          filteredComments.map((comment) => {
            return (
              <li
                key={comment.id}
                id={`${comment.id}`}
                className="comment-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  columnGap: 4,
                  margin: '12px 0',
                }}
              >
                <p id="comment-id">ID: {comment.id}</p>
                <p id="comment-name">
                  Name:
                  <HighlightText highlight={search}>{comment.name}</HighlightText>
                </p>
                <p id="comment-body" style={{ whiteSpace: 'pre' }}>
                  Body: {comment.body}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
