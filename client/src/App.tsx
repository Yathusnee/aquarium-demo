import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Products from "./components/products";
import SubCategory from "./components/products/subcategory";
import Product from "./components/product";
import Cart from "./components/cart";
import Checkout from "./components/cart/checkout";
import Unauthorized from "./components/unauthorized";
import NewOrders from "./components/admin/new_orders";
import Admin from "./components/admin";
import ActiveOrders from "./components/admin/active_orders";
import ShippedOrders from "./components/admin/shipped_orders";
import CompatibilityCalculator from "./components/compatibility_calculator";
import AdminProducts from "./components/admin/products";
import AddEditProduct from "./components/admin/products/add_product";
import Employees from "./components/admin/employees";
import AddEditEmployee from "./components/admin/employees/add_edit_employee";
import Sales from "./components/admin/sales";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="products" element={ <Products /> } />
          <Route path="products/:subcategory" element={ <SubCategory /> } />
          <Route path="product/:id" element={ <Product /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="checkout" element={ <Checkout /> } />
          <Route path="calculator" element={ <CompatibilityCalculator /> } />

          <Route path="admin" element={ <Admin /> } />
          <Route path="admin/new-orders" element={ <NewOrders /> } />
          <Route path="admin/active-orders" element={ <ActiveOrders /> } />
          <Route path="admin/shipped-orders" element={ <ShippedOrders /> } />
          <Route path="admin/products" element={ <AdminProducts /> } />
          <Route path="admin/add-product" element={ <AddEditProduct /> } />
          <Route path="admin/add-product/:id" element={ <AddEditProduct /> } />
          <Route path="admin/employees" element={ <Employees /> } />
          <Route path="admin/add-employee" element={ <AddEditEmployee /> } />
          <Route path="admin/add-employee/:id" element={ <AddEditEmployee /> } />
          <Route path="admin/sales" element={ <Sales /> } />

          <Route path="unauthorized" element={ <Unauthorized /> } />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
