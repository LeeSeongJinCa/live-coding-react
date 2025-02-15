import { IComment } from '../../types';
import { HighlightText } from './HighlightText';

interface CommentListProps {
  comments: IComment[];
  highlight: string;
}

export const CommentList = ({ comments, highlight }: CommentListProps) => {
  return comments.map((comment) => {
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
          <HighlightText highlight={highlight}>{comment.name}</HighlightText>
        </p>
        <p id="comment-body" style={{ whiteSpace: 'pre' }}>
          Body: {comment.body}
        </p>
      </li>
    );
  });
};
