import { PropsWithChildren } from 'react';

export type IHighlightTextProps = PropsWithChildren & {
  highlight: string;
};

export const HighlightText = ({ children, highlight }: IHighlightTextProps) => {
  if (typeof children !== 'string') return children;
  if (highlight === '') return children;

  const regex = new RegExp(`(${highlight})`, 'ig');

  return children
    .split(regex)
    .filter(Boolean)
    .map((name, index) =>
      name === highlight ? (
        <span key={index}>
          <mark>
            <strong>{highlight}</strong>
          </mark>
        </span>
      ) : (
        <span key={index}>{name}</span>
      ),
    );
};
