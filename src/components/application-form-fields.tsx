import type { FC } from 'react';
import { Input } from './input';

export const ApplicationFormFields: FC = () => (
  <>
    <Input label='이름 / 닉네임' name='name' type='text' required autoComplete='name' />

    <Input label='이메일' name='email' type='email' required autoComplete='email' />

    <div>
      <label htmlFor='career' className='font-medium'>
        FE 경력 연차
      </label>
      <select id='career' name='career' className='px-3 py-2 border rounded w-full'>
        <option>0 ~ 3년차</option>
        <option>4 ~ 7년차</option>
        <option>8년차 이상</option>
      </select>
    </div>

    <Input label='GitHub 링크 (선택)' name='github' type='url' autoComplete='email' />
  </>
);
