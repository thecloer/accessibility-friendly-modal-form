import { forwardRef, useEffect, useRef, type PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  onClose?: (result: FormData | null) => void;
}
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ onClose, ...props }, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (isBackdropClicked(e)) {
      dialogRef.current?.close();
      onClose?.(null);
    }
  };

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') ref(dialogRef.current);
    else ref.current = dialogRef.current;
  }, [ref]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCloseEvent = () => {
      onClose?.(null);
    };
    dialog.addEventListener('cancel', () => {});
    dialog.addEventListener('close', onCloseEvent);
    return () => {
      dialog.removeEventListener('close', onCloseEvent);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      className='open:block top-1/2 left-1/2 fixed backdrop:bg-neutral-500 shadow-xl rounded-2xl -translate-x-1/2 -translate-y-1/2'
      {...props}
    />
  );
});

const isBackdropClicked = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>): boolean =>
  e.target === e.currentTarget;
