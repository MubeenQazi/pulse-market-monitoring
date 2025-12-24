import React from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title = 'Error', message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-red-800 font-semibold mb-2">{title}</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
