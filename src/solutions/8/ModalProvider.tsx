import { createContext, ReactNode, useContext, useState } from 'react';

import { uuid } from '../../shared/utils/uuid';
import { Modal } from './Modal';

type ModalOpenHandler = (
  content: (props: { id: string; close: () => void }) => ReactNode,
) => Promise<string>;

type ModalState = {
  id: string;
  content: ReactNode;
  onClose: () => void;
};

interface ModalProviderContext {
  isOpen: (id: string) => boolean;
  open: ModalOpenHandler;
  close: (id: string) => void;
}

export const ModalContext = createContext<ModalProviderContext | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<Map<string, ModalState>>(new Map());

  const isOpen = (id: string) => modals.has(id);

  const closeModal = (id: string) => {
    setModals((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);

      return newMap;
    });
  };

  const openModal: ModalOpenHandler = (children) => {
    return new Promise<string>((resolve) => {
      const id = uuid();

      const onClose = () => {
        closeModal(id);
        resolve(id);
      };

      setModals((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, {
          id,
          content: children({ id, close: onClose }),
          onClose: onClose,
        });

        return newMap;
      });
    });
  };

  return (
    <ModalContext.Provider
      value={{
        open: openModal,
        close: closeModal,
        isOpen,
      }}
    >
      {children}

      {Array.from(modals.values()).map((modal) => (
        <Modal key={modal.id} open={true} onClose={modal.onClose}>
          {modal.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
