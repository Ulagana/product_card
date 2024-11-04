  // import React from "react";
  // import './demo.css';
  // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  // import SignUp from "./components/SignUp";
  // import SignIn from "./components/SignIn";
  // import Data from "./components/Data";
  // import FF from "./components/mm.js"
  // import { AuthProvider } from './AuthContext';

  // // import Admin from "./admin"

  // function App() {

  //   const Secure = ({ component: Component }) => {
  //     const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
  //     return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
  //   };

  //   const InSecure = ({ component: Component }) => {
  //     const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
  //     return !isAuthenticated ? <Component /> : <Navigate to="/FF " replace />;
  //   };

  //   return (
  //     <AuthProvider>
  //       {/* <Router> */}
  //         <Routes>
  //           <Route path="/"element={<InSecure component={ SignUp } />} />
  //           <Route path="/login" element={<InSecure component={ SignIn } />} />
            

  //           <Route
  //             path="/data"
  //             element={<Secure component={ Data } />}

  //           />
  //           <Route path="/FF"
  //           element={<Secure component={ FF } />}
            
  //           />


  //         </Routes>
  //       {/* </Router> */}
  //     </AuthProvider>
  //   );
  // }

  // export default App;

  //////////////////////////////////////////////

  import React from "react";
  import { Route, Routes, Link } from "react-router-dom"; 
  import Category from "./pages/category";
  import Subcategory from "./pages/subcategory";
  import Product from "./pages/product";
  import Home from "./pages/home";
  import List from './pages/list';
  import Leo from './pages/Leo';
  import "bootstrap/dist/css/bootstrap.min.css";
  
  // Layout for Admin Pages (includes Navbar)
  const AdminLayout = ({ children }) => (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            Admin Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/category">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/subcategory">
                  Subcategory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/list">
                  List
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
  
  const App = () => {
    return (
      <div>
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/leo" element={<Leo />} />
      
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="category" element={<Category />} />
                  <Route path="subcategory" element={<Subcategory />} />
                  <Route path="product" element={<Product />} />
                  <Route path="/list" element={<List />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    );
  };
  
  export default App;
  
  
