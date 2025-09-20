import { Button, useApplicationFormModal } from './components';

const ModalFormPage = () => {
  const { ApplicationFormModal, openApplicationFormModal } = useApplicationFormModal();

  const handleApplicationButton = async () => {
    const result = await openApplicationFormModal();
    console.log(result);
    if (result != null) console.log(result?.get('name'));
  };

  return (
    <>
      <div>
        <div className='flex flex-col justify-center items-center w-dvw h-dvh'>
          <Button
            onClick={handleApplicationButton}
            className='bg-gradient-to-r from-blue-500 hover:from-blue-600 active:from-blue-700 to-indigo-500 hover:to-indigo-600 active:to-indigo-700 px-5 py-3.5 rounded-lg font-semibold text-white text-lg'
          >
            🚀 신청 폼 작성하기
          </Button>
        </div>
      </div>

      <ApplicationFormModal />
    </>
  );
};

export default ModalFormPage;
