const ErrorMessage = ({ title = 'Something went wrong', message, onRetry }) => (
  <div className="alert alert-danger d-flex flex-column gap-2" role="alert">
    <strong>{title}</strong>
    <span>{message}</span>
    {onRetry ? (
      <button type="button" className="btn btn-sm btn-outline-danger align-self-start" onClick={onRetry}>
        Try again
      </button>
    ) : null}
  </div>
);

export default ErrorMessage;
