import type { FC } from 'react';
import { Input } from './input';
import { Select } from './select';

const careerOptions = [
  { value: '0~3년', label: '0~3년' },
  { value: '4~7년', label: '4~7년' },
  { value: '8년 이상', label: '8년 이상' },
];

export const ApplicationFormFields: FC = () => (
  <>
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
  </>
);
