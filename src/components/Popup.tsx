import React, { useEffect, useRef } from "react";

interface ModalProps {
  modal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ modal, children, closeModal }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;

    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        closeModal();
      }
    };

    if (dialog) {
      dialog.addEventListener("click", onClick);
      if (modal) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener("click", onClick);
      }
    };
  }, [modal, closeModal]);

  return (
    <dialog ref={ref}>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
}

export default Modal;
