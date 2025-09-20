import { forwardRef, useCallback, useEffect, useId, useRef, type FC } from 'react';

interface FormModalProps {
  onClose: (result: FormData | null) => void;
}
const InnerFormModal = forwardRef<HTMLDialogElement, FormModalProps>(({ onClose }, ref) => {
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
          <h2 className='font-semibold text-xl'>신청 폼</h2>
          <p className='mt-1 text-gray-600 text-sm'>
            이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
          </p>
        </header>

        <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-3 px-8'>
          <div>
            <label htmlFor='name' className='font-medium text-sm'>
              이름 / 닉네임
            </label>
            <input
              id='name'
              name='name'
              type='text'
              required
              className='px-3 py-2 border rounded w-full'
            />
          </div>

          <div>
            <label htmlFor='email' className='font-medium text-sm'>
              이메일
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='px-3 py-2 border rounded w-full'
            />
          </div>

          <div>
            <label htmlFor='career' className='font-medium text-sm'>
              FE 경력 연차
            </label>
            <select id='career' name='career' className='px-3 py-2 border rounded w-full'>
              <option>0 ~ 3년차</option>
              <option>4 ~ 7년차</option>
              <option>8년차 이상</option>
            </select>
          </div>

          <div>
            <label htmlFor='github' className='font-medium text-sm'>
              GitHub 링크 (선택)
            </label>
            <input
              id='github'
              name='github'
              type='url'
              className='px-3 py-2 border rounded w-full'
            />
          </div>
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
});

export const useFormModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resolver = useRef((value: FormData | null) => {});
  const openFormModal = useCallback(async () => {
    dialogRef.current?.showModal();
    return new Promise<FormData | null>((resolve) => (resolver.current = resolve));
  }, []);

  const FormModal: FC = () => (
    <InnerFormModal ref={dialogRef} onClose={(result) => resolver.current(result)} />
  );

  return { openFormModal, FormModal };
};
