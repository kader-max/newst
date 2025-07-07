import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Product } from '../types';

interface AddProductModalProps {
  show: boolean;
  handleClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  categories: string[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ show, handleClose, onAddProduct, categories }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Omit<Product, 'id'> = {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    onAddProduct(newProduct);
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="categorySuggestions"
              required
            />
            <datalist id="categorySuggestions">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
