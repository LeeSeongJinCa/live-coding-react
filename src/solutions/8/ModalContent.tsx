import { PropsWithChildren } from 'react';

interface ModalContentProps extends PropsWithChildren {
  onOpen?: () => void;
  onClose?: () => void;
}

export const ModalContent = ({ children, onOpen, onClose }: ModalContentProps) => {
  return (
    <div className="modal-content">
      <div className="modal-content-inner">{children}</div>

      {onClose && (
        <button className="modal-content-close" type="button" onClick={onClose}>
          Close
        </button>
      )}
      {onOpen && (
        <button className="modal-content-open" type="button" onClick={onOpen}>
          Open
        </button>
      )}
    </div>
  );
};
