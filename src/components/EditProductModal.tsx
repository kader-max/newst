import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Product } from '../types';

interface EditProductModalProps {
  show: boolean;
  handleClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
  categories: string[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  handleClose,
  product,
  onSave,
  categories,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => {
      if (prev) {
        return { ...prev, [name]: name === 'stock' ? parseInt(value) : value };
      }
      return null;
    });
  };

  const handleSubmit = () => {
    if (editedProduct) {
      onSave(editedProduct);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editedProduct && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                list="categorySuggestions"
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
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={editedProduct.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
