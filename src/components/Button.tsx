import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gradient';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white focus:ring-gray-500',
    success: 'bg-green-500 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    danger: 'bg-red-500 hover:bg-red-700 text-white focus:ring-red-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'text-sm py-1 px-3 rounded',
    md: 'py-2 px-4 rounded',
    lg: 'py-4 px-6 rounded-2xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button; 