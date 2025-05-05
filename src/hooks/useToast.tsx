import { useContext } from 'react';
import { ToastContext, ToastProvider } from '../components/ui/Toaster';

export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return {
    toast: context.addToast,
    dismiss: context.removeToast,
  };
}

export { ToastProvider };