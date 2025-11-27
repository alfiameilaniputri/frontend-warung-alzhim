import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-900',

    soft:
      'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-300',

    outline:
      'border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',

    ghost:
      'text-primary-700 hover:bg-neutral-100 active:bg-neutral-300',

    danger:
      'bg-accent-500 text-white hover:bg-accent-700 active:bg-accent-900',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm min-w-[90px]',
    md: 'px-5 py-2 text-base min-w-[110px]',
    lg: 'px-6 py-3 text-lg min-w-[140px]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${base} 
        ${sizes[size]} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}
