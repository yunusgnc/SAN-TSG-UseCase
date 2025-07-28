import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Yükleniyor...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-500 mx-auto mb-2`}></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 