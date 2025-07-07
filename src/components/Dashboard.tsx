import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import AddProductModal from './AddProductModal';
import type { Product } from '../types';

interface DashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  categories: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, onAddProduct, categories }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Inventory Dashboard</h2>
        <Button variant="primary" onClick={handleShowAddModal}>
          Add New Product
        </Button>
      </div>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text className="fs-1 fw-bold">{totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Stock</Card.Title>
              <Card.Text className="fs-1 fw-bold">{totalStock}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Inventory Value</Card.Title>
              <Card.Text className="fs-1 fw-bold">${totalValue.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AddProductModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        onAddProduct={onAddProduct}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;
