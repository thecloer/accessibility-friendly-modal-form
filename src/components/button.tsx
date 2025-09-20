import type { FC, PropsWithChildren } from 'react';

type ButtonVariant = 'mute' | 'primary';

interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = ({ children, variant = 'mute' }) => {
  const color = getColor(variant);
  return <button className={`px-3 py-2.5 rounded-lg cursor-pointer ${color}`}>{children}</button>;
};

const getColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700';
  return 'bg-neutral-400';
};
