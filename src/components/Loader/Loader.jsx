const Loader = ({ type = 'grid' }) => {
  if (type === 'page') {
    return <div className="placeholder-glow py-5 text-center">Loading page...</div>;
  }

  return (
    <div className="row g-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="col-sm-6 col-md-4 col-xl-3" key={index}>
          <div className="card border-0 shadow-sm">
            <div className="placeholder-glow p-3">
              <span className="placeholder col-12" style={{ height: '180px' }} />
              <span className="placeholder col-8 mt-3" />
              <span className="placeholder col-4 mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
