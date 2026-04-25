const About = () => (
  <section className="bg-white rounded-4 p-4 p-md-5 shadow-sm">
    <h2 className="h3 mb-3">About Smart Marketplace Dashboard</h2>
    <p className="text-muted">
      This project demonstrates a production-style React architecture with modular components,
      resilient API fallback strategy, route-based code splitting, and persistent user state using
      localStorage.
    </p>
    <ul className="text-muted">
      <li>Primary API: Fake Store API</li>
      <li>Fallback API: DummyJSON products</li>
      <li>Final fallback: Local JSON dataset</li>
      <li>Built with React, Bootstrap, Axios, and React Router</li>
    </ul>
  </section>
);

export default About;
