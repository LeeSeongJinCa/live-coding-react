/**
 * 8. Create a Modal Component
 *
 * Problem:
 * - Create a reusable modal component that can be opened and closed and display any content passed to it.
 * - 열고 닫을 수 있고 전달된 모든 콘텐츠를 표시할 수 있는 재사용 가능한 모달 컴포넌트를 만듭니다.
 */

import { ModalContent } from './ModalContent';
import { ModalProvider, useModal } from './ModalProvider';

export const ModalExample2 = () => {
  return (
    <ModalProvider>
      <Container />
    </ModalProvider>
  );
};

export const Container = () => {
  const modal = useModal();

  return (
    <button
      className="open"
      type="button"
      onClick={() => {
        modal.open(({ close }) => (
          <ModalContent
            onOpen={() => {
              modal.open(({ close }) => (
                <ModalContent onClose={close}>
                  <h1>Modal 2</h1>
                  <p>This is a modal 2</p>
                </ModalContent>
              ));
            }}
            onClose={close}
          >
            <h1>Modal</h1>
            <p>This is a modal</p>
          </ModalContent>
        ));
      }}
    >
      Open
    </button>
  );
};
