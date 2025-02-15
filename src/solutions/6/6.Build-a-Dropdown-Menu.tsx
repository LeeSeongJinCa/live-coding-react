/**
 * 6. Build a Dropdown Menu
 *
 * Problem:
 * - Create a dropdown menu component that displays a list of items when clicked.
 * - 클릭 시 항목 목록을 표시하는 드롭다운 메뉴 컴포넌트를 만듭니다.
 */

import { useRef } from 'react';

import { useToggle } from '../../shared/hooks/useToggle';
import { Menu } from './Menu';

export const DropdownMenu = () => {
  const { value: isOpen, toggle } = useToggle(false);
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
        {isOpen ? 'Close' : 'Open'}
      </button>

      <Menu open={isOpen} anchorEl={anchorRef.current}>
        <li className="menu-item">
          <button type="button" style={{ width: 100 }} onClick={toggle}>
            1
          </button>
        </li>
        <li>
          <button type="button" style={{ width: 100 }} onClick={toggle}>
            2
          </button>
        </li>
        <li>
          <button type="button" style={{ width: 100 }} onClick={toggle}>
            3
          </button>
        </li>
      </Menu>
    </div>
  );
};
