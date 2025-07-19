import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '~/pages/customer/HomePage';
import AdminPage from '../pages/admin/AdminPage';
import PrivateRoute from './PrivateRoute';
import AboutPage from '~/pages/customer/AboutPage';
import ServicesPage from '~/pages/customer/ServicePage';
import ShopPage from '~/pages/customer/ShopPage';
import RegisterPage from '~/pages/RegisterPage';
import NewsPage from '~/pages/customer/NewsPage';
import ContactPage from '~/pages/customer/ContactPage';
import UserProfile from '~/pages/customer/UserProfile';
import AppointmentHistory from '~/pages/customer/AppointmentHistory';
import UnauthorizedPage from '~/pages/UnauthorizedPage';
{/* admin */}
import ManagerUser from '../pages/admin/managerUser/ManagerUser';
import UserDetail from "../pages/admin/ManagerUser/UserDetail";
import ServiceManager from "../pages/admin/managerService/ManagerService";
import AddService from "../pages/admin/managerService/AddService";
import EditService from "../pages/admin/managerService/EditService";
import ManagerProduct from '~/pages/admin/managerProduct/ManagerProduct';
import AddProduct from '~/pages/admin/managerProduct/AddProduct';
import EditProduct from '~/pages/admin/managerProduct/EditProduct';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/customer" element={<PrivateRoute allowedRoles={['customer']}><HomePage /></PrivateRoute>} />
      <Route path="/customer/about" element={<PrivateRoute allowedRoles={['customer']}><AboutPage /></PrivateRoute>} />
      <Route path="/customer/services" element={<PrivateRoute allowedRoles={['customer']}><ServicesPage /></PrivateRoute>} />
      <Route path="/customer/shop" element={<PrivateRoute allowedRoles={['customer']}><ShopPage /></PrivateRoute>} />
      <Route path="/customer/news" element={<PrivateRoute allowedRoles={['customer']}><NewsPage /></PrivateRoute>} />
      <Route path="/customer/contact" element={<PrivateRoute allowedRoles={['customer']}><ContactPage /></PrivateRoute>} />
      <Route path="/customer/profile" element={<PrivateRoute allowedRoles={['customer']}><UserProfile /></PrivateRoute>} />
      <Route path="/customer/appointments" element={<PrivateRoute allowedRoles={['customer']}><AppointmentHistory /></PrivateRoute>} />



 {/* Admin router */}
      <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminPage /></PrivateRoute>} />
      <Route path="/admin/users" element={<ManagerUser/>}/> 
      <Route path="/admin/users/:id" element={<UserDetail />} />
      <Route path="/admin/services" element={<ServiceManager />} />
      <Route path="/admin/services/add" element={<AddService />} />
      <Route path="/admin/services/edit/:id" element={<EditService />} />
      <Route path="/admin/products" element={<ManagerProduct />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      {/* <Route path='/admin' element={<AdminPage/>}/> */}
    </Routes>
  );
}
