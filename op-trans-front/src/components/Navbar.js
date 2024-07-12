import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  const styleList = {
    width: '.5em',
    height: '.5em'
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: 'fixed', marginBottom: '506px', top: 0, width: '100%' }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand mr-50" to="/app/home">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Manifiestos
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
          </ul>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Weizman
                  <i className="fas fa-user-tie" />
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <button className="dropdown-item d-flex align-items-center gap-2 py-2" >
                    <span className="d-inline-block bg-danger rounded-circle" style={styleList} />
                    Cerrar Sesión
                  </button>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
