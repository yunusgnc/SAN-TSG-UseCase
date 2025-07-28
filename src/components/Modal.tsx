import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Onayla',
  cancelText = 'İptal',
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'bg-red-500',
      iconColor: 'text-white',
      button: 'danger'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'bg-yellow-500',
      iconColor: 'text-white',
      button: 'warning'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-500',
      iconColor: 'text-white',
      button: 'primary'
    }
  };

  const config = variantConfig[variant];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
      <div className={`bg-white rounded-xl shadow-lg border ${config.border} max-w-xs w-full`}>
        <div className={`flex items-center gap-2 px-4 pt-4 pb-2 ${config.bg} rounded-t-xl`}>
          <div className={`w-8 h-8 ${config.icon} rounded-lg flex items-center justify-center`}>
            {variant === 'danger' && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
            {variant === 'warning' && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
            {variant === 'info' && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
        <div className="flex gap-2 justify-end px-4 pb-4">
          <Button
            variant="secondary"
            onClick={onClose}
            size="sm"
          >
            {cancelText}
          </Button>
          <Button
            variant={config.button as any}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            size="sm"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 