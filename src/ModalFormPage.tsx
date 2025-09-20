import { Button, useApplicationFormModal } from './components';

const ModalFormPage = () => {
  const { ApplicationFormModal, openApplicationFormModal } = useApplicationFormModal();

  const handleButton = async () => {
    const result = await openApplicationFormModal();
    console.log(result);
    if (result != null) console.log(result?.get('name'));
  };

  return (
    <>
      <div className='flex justify-center items-center w-dvw h-dvh'>
        <Button variant='primary' onClick={handleButton}>
          신청 폼 작성하기
        </Button>
      </div>

      <ApplicationFormModal />
    </>
  );
};

export default ModalFormPage;
