import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const TemplateAdmin = ({ children }) => (
  <>
    <Navbar />
    <div className="main container-fluid" style={{ marginTop: '68px' }}>
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 container">
          {children}
        </main>
      </div>
    </div>
  </>
);

export default TemplateAdmin;
