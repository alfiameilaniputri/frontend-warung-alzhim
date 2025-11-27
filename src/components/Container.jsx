import React from 'react';

const Container = ({ 
  children, 
  maxWidth = 'xl',
  padding = true,
  className = '' 
}) => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };
  
  const paddingClass = padding ? 'px-4 md:px-6 lg:px-8' : '';
  
  return (
    <div className={`${maxWidths[maxWidth]} mx-auto ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;