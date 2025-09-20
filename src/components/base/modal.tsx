import { forwardRef, useEffect, useImperativeHandle, useRef, type PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  onClose?: () => void;
}
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ onClose, ...props }, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  const handleClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (isBackdropClicked(e)) {
      dialogRef.current?.close();
      onClose?.();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!(dialog && onClose)) return;

    // dialog.addEventListener('cancel', () => {}); ESC 동작 커스텀
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const toggleBodyScroll = () => {
      document.body.style.overflow = dialog.open ? 'hidden' : '';
    };

    const observer = new MutationObserver(toggleBodyScroll);
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });

    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      className='open:block top-1/2 left-1/2 fixed backdrop:bg-neutral-800/50 shadow-xl rounded-2xl -translate-x-1/2 -translate-y-1/2'
      {...props}
    />
  );
});

const isBackdropClicked = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>): boolean =>
  e.target === e.currentTarget;
