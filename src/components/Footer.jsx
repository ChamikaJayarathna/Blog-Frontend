import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaGem, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Right */}
          <div>
            <a href="#" className="me-4 text-reset">
              <FaFacebookF />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaTwitter />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaGoogle />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaInstagram />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaLinkedin />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaGithub />
            </a>
          </div>
        </section>

        {/* Section: Links */}
        <section>
          <Container className="text-center text-md-start mt-5">
            {/* Grid row */}
            <Row className="mt-3">
              {/* Grid column */}
              <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <FaGem className="me-3" /> Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </Col>
              {/* Grid column */}

              {/* Grid column */}
              <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">
                  Products
                </h6>
                <p>
                  <a href="#!" className="text-reset">Angular</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Vue</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Laravel</a>
                </p>
              </Col>
              {/* Grid column */}

              {/* Grid column */}
              <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </Col>
              {/* Grid column */}

              {/* Grid column */}
              <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><FaHome className="me-3" /> New York, NY 10012, US</p>
                <p>
                  <FaEnvelope className="me-3" />
                  info@example.com
                </p>
                <p><FaPhone className="me-3" /> + 01 234 567 88</p>
                <p><FaPrint className="me-3" /> + 01 234 567 89</p>
              </Col>
              {/* Grid column */}
            </Row>
            {/* Grid row */}
          </Container>
        </section>

        {/* Copyright */}
        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © {new Date().getFullYear()} Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
