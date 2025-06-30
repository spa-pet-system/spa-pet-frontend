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

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/customer" element={<PrivateRoute allowedRoles={['customer']}><HomePage /></PrivateRoute>} />
      <Route path="/customer/about" element={<PrivateRoute allowedRoles={['customer']}><AboutPage /></PrivateRoute>} />
      <Route path="/customer/services" element={<PrivateRoute allowedRoles={['customer']}><ServicesPage /></PrivateRoute>} />
      <Route path="/customer/shop" element={<PrivateRoute allowedRoles={['customer']}><ShopPage /></PrivateRoute>} />
      <Route path="/customer/news" element={<PrivateRoute allowedRoles={['customer']}><NewsPage /></PrivateRoute>} />
      <Route path="/customer/contact" element={<PrivateRoute allowedRoles={['customer']}><ContactPage /></PrivateRoute>} />




      <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminPage /></PrivateRoute>} />
      {/* <Route path='/customer' element={<CustomerPage/>}/> */}
      {/* <Route path='/admin' element={<AdminPage/>}/> */}
    </Routes>
  );
}
