import type { FC, PropsWithChildren } from 'react';

type ButtonVariant = 'mute' | 'primary';

interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ children, variant = 'mute', onClick }) => {
  const color = getColor(variant);
  return (
    <button className={`px-3 py-2.5 rounded-lg cursor-pointer ${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

const getColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700';
  return 'bg-neutral-400';
};
