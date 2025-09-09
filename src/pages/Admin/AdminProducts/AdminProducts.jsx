import React, { useState } from 'react';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 199.99, stock: 45, category: 'Electronics', status: 'Active', image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 2, name: 'Smart Watch', price: 299.99, stock: 23, category: 'Electronics', status: 'Active', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 3, name: 'Running Shoes', price: 129.99, stock: 67, category: 'Sports', status: 'Active', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 4, name: 'Coffee Maker', price: 89.99, stock: 12, category: 'Home', status: 'Low Stock', image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 5, name: 'Laptop Bag', price: 49.99, stock: 0, category: 'Accessories', status: 'Out of Stock', image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 6, name: 'Gaming Mouse', price: 79.99, stock: 34, category: 'Electronics', status: 'Active', image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': 'success',
      'Low Stock': 'warning',
      'Out of Stock': 'danger'
    };
    return `badge bg-${statusMap[status] || 'secondary'}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Products Management</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Sports</option>
                <option>Home</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Status</option>
                <option>Active</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-semibold">{product.name}</div>
                          <small className="text-muted">ID: {product.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="fw-semibold">${product.price}</td>
                    <td>
                      <span className={product.stock < 20 ? 'text-warning fw-semibold' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{product.category}</span>
                    </td>
                    <td>
                      <span className={getStatusBadge(product.status)}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-info" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminProducts;