import React, { useState } from 'react';
import { Table, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import type { Product } from '../types';

import EditProductModal from './EditProductModal';

interface ProductListProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  categories: string[];
}

const ProductList: React.FC<ProductListProps> = ({ products, onSaveProduct, onDeleteProduct, categories }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleIncrementStock = (id: string) => {
    const productToUpdate = products.find(product => product.id === id);
    if (productToUpdate) {
      onSaveProduct({ ...productToUpdate, stock: productToUpdate.stock + 1 });
    }
  };

  const handleDecrementStock = (id: string) => {
    const productToUpdate = products.find(product => product.id === id);
    if (productToUpdate) {
      onSaveProduct({ ...productToUpdate, stock: Math.max(0, productToUpdate.stock - 1) });
    }
  };

  const handleDeleteProduct = (id: string) => {
    onDeleteProduct(id);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2>Product List</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Form.Select value={filterCategory} onChange={handleFilterChange} style={{ maxWidth: '150px' }}>
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button variant="outline-secondary" size="sm" onClick={() => handleDecrementStock(product.id)}>-</Button>
                <span className="mx-2">{product.stock}</span>
                <Button variant="outline-secondary" size="sm" onClick={() => handleIncrementStock(product.id)}>+</Button>
              </td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditProductModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        product={selectedProduct}
        onSave={onSaveProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductList;
