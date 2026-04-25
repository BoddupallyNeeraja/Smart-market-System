import { useEffect, useState } from 'react';

const ToastNotifier = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setToast({
        id: Date.now(),
        message: event.detail.message,
        variant: event.detail.variant || 'success',
      });
    };

    window.addEventListener('smart-marketplace:toast', handler);
    return () => window.removeEventListener('smart-marketplace:toast', handler);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div className={`toast show align-items-center text-bg-${toast.variant} border-0`}>
        <div className="d-flex">
          <div className="toast-body">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setToast(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastNotifier;
