import { useId, type FC, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}
export const Select: FC<SelectProps> = ({ id: customId, label, className = '', ...props }) => {
  const generatedId = useId();
  const id = customId ?? generatedId;

  return (
    <div className={`field-wrapper ${className}`}>
      {label == null ? null : (
        <label htmlFor={id} className='label'>
          {label}
        </label>
      )}
      <select id={id} className='field' {...props} />
    </div>
  );
};
