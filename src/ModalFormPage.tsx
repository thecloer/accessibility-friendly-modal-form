import { Button, useFormModal } from './components';

const ModalFormPage = () => {
  const { FormModal, openFormModal } = useFormModal();

  const handleButton = async () => {
    const result = await openFormModal();
    console.log(result);
    console.log(result?.get('name'));
  };

  return (
    <div className='flex justify-center items-center w-dvw h-dvh'>
      {/* TODO: 별도 버튼 개발 필요 */}
      <Button variant='primary' onClick={handleButton}>
        신청 폼 작성하기
      </Button>
      <FormModal />
    </div>
  );
};

export default ModalFormPage;
