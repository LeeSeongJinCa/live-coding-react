/**
 * 6. Build a Dropdown Menu
 *
 * Problem:
 * - Create a dropdown menu component that displays a list of items when clicked.
 * - 클릭 시 항목 목록을 표시하는 드롭다운 메뉴 컴포넌트를 만듭니다.
 */

import { useRef } from 'react';

import { Menu } from './Menu';
import { useToggle } from './useToggle';

export const DropdownMenu = () => {
  const [isOpen, toggle] = useToggle(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <button
        ref={anchorRef}
        style={{
          margin: '20px',
        }}
        onClick={toggle}
      >
        Open
      </button>

      <Menu open={isOpen} anchorEl={anchorRef.current}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </Menu>
    </div>
  );
};
