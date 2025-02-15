/**
 * 8. Create a Modal Component
 *
 * Problem:
 * - Create a reusable modal component that can be opened and closed and display any content passed to it.
 * - 열고 닫을 수 있고 전달된 모든 콘텐츠를 표시할 수 있는 재사용 가능한 모달 컴포넌트를 만듭니다.
 */

import { useState } from 'react';

import { Modal } from './Modal';

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h1>Modal</h1>
          <p>This is a modal</p>

          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
          <button type="button" onClick={() => setIsOpen2(true)}>
            Open
          </button>
        </div>
      </Modal>

      <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
        <div>
          <h1>Modal 2</h1>
          <p>This is a modal 2</p>

          <button type="button" onClick={() => setIsOpen2(false)}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
