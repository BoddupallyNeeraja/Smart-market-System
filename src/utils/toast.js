export const showToast = (message, variant = 'success') => {
  window.dispatchEvent(
    new CustomEvent('smart-marketplace:toast', {
      detail: { message, variant },
    })
  );
};
