import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  return (
    <nav className="breadcrumb-container bg-white p-3 mb-3" aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          {location.pathname === '/products' ? 'Products' : 'Admin'}
        </li>
      </ol>
    </nav >
  )
}

export default Breadcrumb;