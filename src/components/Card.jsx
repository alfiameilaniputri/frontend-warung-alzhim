import React from 'react';

const Card = ({ 
  children, 
  hover = false,
  padding = 'md',
  className = '' 
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  };
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;