import { useId, type FC, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}
export const Select: FC<SelectProps> = ({ id: customId, label, className, ...props }) => {
  const generatedId = useId();
  const id = customId ?? generatedId;

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      {label == null ? null : (
        <label htmlFor={id} className='font-semibold'>
          {label}
        </label>
      )}
      <select id={id} className='px-4 py-3 border border-neutral-200 rounded' {...props} />
    </div>
  );
};
