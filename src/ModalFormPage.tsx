import { Button, useFormModal, ApplicationFormFields } from './components';

const ModalFormPage = () => {
  const { FormModal, openFormModal } = useFormModal();

  const handleButton = async () => {
    const result = await openFormModal();
    console.log(result);
    if (result != null) console.log(result?.get('name'));
  };

  return (
    <div className='flex justify-center items-center w-dvw h-dvh'>
      <Button variant='primary' onClick={handleButton}>
        신청 폼 작성하기
      </Button>
      <FormModal title='신청 폼' description='이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.'>
        <ApplicationFormFields />
      </FormModal>
    </div>
  );
};

export default ModalFormPage;
