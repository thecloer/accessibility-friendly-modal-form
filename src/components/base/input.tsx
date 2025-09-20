import { useId, type FC, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Input: FC<InputProps> = ({ id: customId, label, className = '', ...props }) => {
  const generatedId = useId();
  const id = customId ?? generatedId;

  return (
    <div className={`field-wrapper ${className}`}>
      {label == null ? null : (
        <label htmlFor={id} className='label'>
          {label}
        </label>
      )}
      <input id={id} className='field' {...props} />
    </div>
  );
};
