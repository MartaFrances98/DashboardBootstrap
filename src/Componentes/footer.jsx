import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Twitter, Instagram, Facebook } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';


function FooterComponent() {
  return (
    <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 border-top bgfooter">
      <Container>
        <div className='row'>
          <div className="col-md-9 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            </a>
            <span className="text-muted company-text">© 2024 Marta Francés Pintado, 2DAW, DISEÑO</span>
          </div>
          <div className="col-md-3 align-right">
            <ul className="row list-unstyled d-flex social-icons align-right">
              <li className="ms-3 col">
                <a className="text-muted" href="#">
                  <Twitter size={24} />
                </a>
              </li>
              <li className="ms-3 col">
                <a className="text-muted" href="#">
                  <Instagram size={24} />
                </a>
              </li>
              <li className="ms-3 col">
                <a className="text-muted" href="#">
                  <Facebook size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;

