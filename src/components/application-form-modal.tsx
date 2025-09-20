import { useCallback, useRef, type FC } from 'react';
import { Modal } from './base';
import { ApplicationForm } from './application-form';

export const useApplicationFormModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeFormModal = useRef((_: FormData | null) => {});

  const openApplicationFormModal = useCallback(async () => {
    dialogRef.current?.showModal();
    return new Promise<FormData | null>((resolve) => (closeFormModal.current = resolve));
  }, []);

  const ApplicationFormModal: FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (data: FormData) => {
      dialogRef.current?.close();
      formRef.current?.reset();
      closeFormModal.current(data);
    };

    const handelClose = () => {
      dialogRef.current?.close();
      formRef.current?.reset();
      closeFormModal.current(null);
    };

    return (
      <Modal ref={dialogRef} onClose={handelClose}>
        <div className='flex flex-col gap-4 bg-white w-[min(92vw,520px)]'>
          <header className='px-8 pt-6'>
            <h2 className='mb-2 font-extrabold text-3xl'>신청 폼</h2>
            <p className='font-semibold text-neutral-500'>
              이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
            </p>
          </header>

          <ApplicationForm ref={formRef} onSubmit={handleSubmit} onClose={handelClose} />
        </div>
      </Modal>
    );
  };

  return { openApplicationFormModal, ApplicationFormModal };
};
