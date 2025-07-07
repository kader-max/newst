import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("../../profile.png")', // Local image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="d-flex flex-column align-items-center justify-content-center h-100">
        <h1 className="display-3 fw-bold mb-3">Efficient Inventory Management</h1>
        <p className="lead mb-4">
          Take control of your stock with our intuitive and powerful inventory solution.
        </p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            View Products
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
