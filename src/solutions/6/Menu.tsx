/**
 * open에 따라 메뉴를 표시합니다.
 * anchorEl에 따라 메뉴의 위치를 결정합니다.
 */

import { PropsWithChildren } from 'react';

interface MenuProps extends PropsWithChildren {
  open: boolean;
  anchorEl?: HTMLElement | null;
}

export const Menu = ({ children, open, anchorEl }: MenuProps) => {
  if (!open) return;
  if (!anchorEl) return;

  const anchorRect = anchorEl.getBoundingClientRect();

  return (
    <menu
      style={{
        position: 'absolute',
        top: anchorRect.top + anchorRect.height,
        left: anchorRect.left,
        marginTop: '4px',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </menu>
  );
};
