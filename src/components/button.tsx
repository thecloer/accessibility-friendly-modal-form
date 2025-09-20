import type { FC, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'mute' | 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
export const Button: FC<ButtonProps> = ({ className = '', variant = 'mute', ...props }) => {
  const color = getColor(variant);
  return <button className={`px-3 py-2 rounded cursor-pointer ${color} ${className}`} {...props} />;
};

const getColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800';
  if (variant === 'mute')
    return 'bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-400';
  return '';
};
