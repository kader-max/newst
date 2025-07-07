import { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { getProducts, saveProducts } from './data/mockProducts';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from './types';

function App() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>(getProducts());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = { ...newProduct, id: uuidv4() };
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, productWithId];
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== id);
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Button variant="dark" onClick={handleShow} className="me-2">
            ☰
          </Button>
          <Navbar.Brand as={Link} to="/">Inventory Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleClose}>Products</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>Dashboard</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList products={products} onSaveProduct={handleSaveProduct} onDeleteProduct={handleDeleteProduct} categories={categories} />} />
          <Route path="/dashboard" element={<Dashboard products={products} onAddProduct={handleAddProduct} categories={categories} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;