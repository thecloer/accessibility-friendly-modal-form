import { useCallback, useEffect, useId, useRef, type FC, type PropsWithChildren } from 'react';
import { Button, Modal } from './base';

interface FormModalProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export const useFormModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeFormModal = useRef((_: FormData | null) => {});

  const openFormModal = useCallback(async () => {
    dialogRef.current?.showModal();
    return new Promise<FormData | null>((resolve) => (closeFormModal.current = resolve));
  }, []);

  const FormModal: FC<FormModalProps> = ({ title, description, children }) => {
    const formId = useId();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);
      dialogRef.current?.close();
      closeFormModal.current(data);
    };

    useEffect(() => {
      const resetForm = () => {
        formRef.current?.reset();
      };
      dialogRef.current?.addEventListener('close', resetForm);
      return () => {
        dialogRef.current?.removeEventListener('close', resetForm);
      };
    }, []);

    return (
      <Modal ref={dialogRef} onClose={closeFormModal.current}>
        <div className='flex flex-col gap-4 bg-white w-[min(92vw,520px)]'>
          <header className='px-8 pt-6'>
            <h2 className='mb-2 font-extrabold text-3xl'>{title}</h2>
            <p className='font-semibold text-neutral-500'>{description}</p>
          </header>

          <form
            id={formId}
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 px-8'
          >
            {children}
          </form>

          <footer className='flex justify-end items-center gap-2 mt-6 px-8 pb-6'>
            <Button
              onClick={() => {
                (dialogRef.current as HTMLDialogElement | null)?.close();
                closeFormModal.current(null);
              }}
            >
              취소
            </Button>
            <Button variant='primary' type='submit' form={formId}>
              제출하기
            </Button>
          </footer>
        </div>
      </Modal>
    );
  };

  return { openFormModal, FormModal };
};
