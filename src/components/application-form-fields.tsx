import type { FC } from 'react';

export const ApplicationFormFields: FC = () => (
  <>
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
  </>
);