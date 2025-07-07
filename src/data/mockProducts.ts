import type { Product } from '../types';

const LOCAL_STORAGE_KEY = 'inventoryProducts';

export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return [
    {
      id: '1',
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1200,
      stock: 50,
    },
    {
      id: '2',
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 150,
      stock: 120,
    },
    {
      id: '3',
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 45,
      stock: 200,
    },
    {
      id: '4',
      name: 'Desk Chair Ergo',
      category: 'Furniture',
      price: 300,
      stock: 75,
    },
    {
      id: '5',
      name: 'Monitor 4K',
      category: 'Electronics',
      price: 450,
      stock: 90,
    },
    {
      id: '6',
      name: 'Notebook Set',
      category: 'Stationery',
      price: 20,
      stock: 300,
    },
    {
      id: '7',
      name: 'Pen Pack',
      category: 'Stationery',
      price: 10,
      stock: 500,
    },
    {
      id: '8',
      name: 'External SSD 1TB',
      category: 'Electronics',
      price: 100,
      stock: 150,
    },
    {
      id: '9',
      name: 'Webcam HD',
      category: 'Electronics',
      price: 70,
      stock: 180,
    },
    {
      id: '10',
      name: 'Office Lamp',
      category: 'Furniture',
      price: 60,
      stock: 100,
    },
  ];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};
