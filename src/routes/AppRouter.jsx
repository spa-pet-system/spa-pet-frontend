import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CustomerPage from '../pages/CustomerPage';
import AdminPage from '../pages/AdminPage';
import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customer" element={<PrivateRoute allowedRoles={['customer']}><CustomerPage /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminPage /></PrivateRoute>} />
      {/* <Route path='/customer' element={<CustomerPage/>}/> */}
      {/* <Route path='/admin' element={<AdminPage/>}/> */}
    </Routes>
  );
}
