import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ children, open, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="modal-backdrop"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 9998,
        }}
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(event) => event.key === 'Escape' && onClose()}
      />

      <div
        className="modal-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '40px',
        }}
      >
        <div
          className="modal-content-inner"
          style={{
            minWidth: '240px',
            minHeight: '120px',
            maxWidth: 'calc(100% - 80px)',
            backgroundColor: '#ffffff',
            zIndex: 9999,
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
