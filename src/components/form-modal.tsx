import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  type FC,
  type PropsWithChildren,
} from 'react';

interface FormModalProps extends PropsWithChildren {
  title?: string;
  description?: string;
  onClose: (result: FormData | null) => void;
}
const InnerFormModal = forwardRef<HTMLDialogElement, FormModalProps>(
  ({ title, description, children, onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const formId = useId();

    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') ref(dialogRef.current);
      else ref.current = dialogRef.current;
    }, [ref]);

    const handleBackdropClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
      if (e.target === e.currentTarget) {
        dialogRef.current?.close();
        onClose(null);
      }
    };

    useEffect(() => {
      const dlg = dialogRef.current;
      if (!dlg) return;

      const onCloseEvent = () => {
        onClose(null);
      };
      dlg.addEventListener('cancel', (ev) => {});
      dlg.addEventListener('close', onCloseEvent);
      return () => {
        dlg.removeEventListener('close', onCloseEvent);
      };
    }, [onClose]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);
      dialogRef.current?.close();
      onClose(data);
    };

    return (
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className='open:block top-1/2 left-1/2 fixed backdrop:bg-neutral-200 shadow-xl p-0 rounded-xl -translate-x-1/2 -translate-y-1/2'
      >
        <div className='flex flex-col gap-3 bg-white w-[min(92vw,520px)]'>
          <header className='flex flex-col px-8 pt-6'>
            <h2 className='font-semibold text-xl'>{title}</h2>
            <p className='mt-1 text-gray-600 text-sm'>{description}</p>
          </header>

          <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-3 px-8'>
            {children}
          </form>

          <footer className='flex justify-end items-center gap-3 mt-6 px-8 pb-6'>
            <button
              type='button'
              onClick={() => {
                (dialogRef.current as HTMLDialogElement | null)?.close();
                onClose(null);
              }}
              className='px-4 py-2 border rounded-md'
            >
              취소
            </button>
            <button
              type='submit'
              form={formId}
              className='bg-blue-400 px-4 py-2 rounded-md text-white'
            >
              제출
            </button>
          </footer>
        </div>
      </dialog>
    );
  }
);

export const useFormModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resolver = useRef((value: FormData | null) => {});
  const openFormModal = useCallback(async () => {
    dialogRef.current?.showModal();
    return new Promise<FormData | null>((resolve) => (resolver.current = resolve));
  }, []);

  const FormModal: FC<Pick<FormModalProps, 'title' | 'description' | 'children'>> = ({
    title,
    description,
    children,
  }) => (
    <InnerFormModal
      ref={dialogRef}
      title={title}
      description={description}
      onClose={(result) => resolver.current(result)}
    >
      {children}
    </InnerFormModal>
  );

  return { openFormModal, FormModal };
};
