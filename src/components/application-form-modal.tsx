import { useCallback, useId, useRef, type FC } from 'react';
import { Modal } from './base';
import { ApplicationForm } from './application-form';

export const useApplicationFormModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

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
      <Modal
        ref={dialogRef}
        onClose={handelClose}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className='flex flex-col gap-4 bg-white p-8 w-[min(92vw,520px)] max-h-[90vh]'>
          <header>
            <h2
              id={titleId}
              tabIndex={0}
              className='mb-2 focus:outline-none font-extrabold text-3xl'
            >
              신청 폼
            </h2>
            <p id={descriptionId} className='font-semibold text-neutral-500'>
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
