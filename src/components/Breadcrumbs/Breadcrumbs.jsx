import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items = [] }) => (
  <nav aria-label="breadcrumb" className="mb-3">
    <ol className="breadcrumb mb-0">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      {items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className={`breadcrumb-item ${item.to ? '' : 'active'}`}
          aria-current={item.to ? undefined : 'page'}
        >
          {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
