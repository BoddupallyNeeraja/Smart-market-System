const EmptyState = ({ title, message, action }) => (
  <div className="text-center bg-white border rounded-3 p-5 shadow-sm">
    <h4>{title}</h4>
    <p className="text-muted mb-4">{message}</p>
    {action}
  </div>
);

export default EmptyState;
