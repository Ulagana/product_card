// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/admin/category">Category</Link>
        <Link to="/admin/subcategory">Subcategory</Link>
        <Link to="/admin/product">Product</Link>
      </nav>
      <Outlet /> {/* Renders the child routes */}
    </div>
  );
};

export default AdminLayout;
