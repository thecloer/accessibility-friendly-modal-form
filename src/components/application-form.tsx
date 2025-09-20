import { forwardRef, useRef, type FC } from 'react';
import { Button, Input, Select } from './base';

const careerOptions = [
  { value: '0~3년', label: '0~3년' },
  { value: '4~7년', label: '4~7년' },
  { value: '8년 이상', label: '8년 이상' },
];

interface ApplicationForm {
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}
export const ApplicationForm = forwardRef<HTMLFormElement, ApplicationForm>(
  function ApplicationForm({ onSubmit, onClose }, ref) {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);
      onSubmit(data);
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} className='flex flex-col gap-3 px-8'>
        <Input
          label='이름 / 닉네임'
          aria-label='닉네임'
          name='name'
          type='text'
          required
          autoComplete='name'
        />

        <Input
          label='이메일'
          aria-label='이메일'
          name='email'
          type='email'
          required
          autoComplete='email'
        />

        <Select label='FE 경력 연차' aria-label='FE 경력 연차' name='career' defaultValue={''}>
          <option value='' disabled hidden>
            선택해주세요
          </option>

          {careerOptions.map(({ value, label }) => (
            <option key={value} value={value} aria-label={label}>
              {label}
            </option>
          ))}
        </Select>

        <Input
          label='GitHub 링크 (선택)'
          aria-label='github 링크'
          name='github'
          type='url'
          autoComplete='email'
          placeholder='https//:github.com/username'
        />

        <footer className='flex justify-end items-center gap-2 mt-6 px-8 pb-6'>
          <Button onClick={onClose}>취소</Button>
          <Button variant='primary' type='submit'>
            제출하기
          </Button>
        </footer>
      </form>
    );
  }
);
