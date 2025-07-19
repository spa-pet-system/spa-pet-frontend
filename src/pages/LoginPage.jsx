import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '~/services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "~/contexts/AuthProvider";
import { getProfile } from "~/services/userService";
import { toast } from 'react-toastify'

const schema = yup.object().shape({
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^0\d{9}$/, 'Số điện thoại không đúng định dạng'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async ({ phone, password }) => {
  try {
    const data = await login(phone, password);

    // Lưu token vào localStorage
    localStorage.setItem("token", data.accessToken);

    const profile = await getProfile();
    setUser(profile);
    toast.success('Đăng nhập thành công!');

    if (profile.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/customer');
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Đăng nhập thất bại');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 bg-white rounded-2xl shadow-xl">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img src="/dog.png" alt="Login illustration" className="w-full h-auto max-w-md" />
        </div>

        {/* Right Login Form */}
        <div className="flex flex-col justify-center px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-500 mb-6">Welcome Back! Enter your information below</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Số điện thoại"
                {...register('phone')}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.phone && <p className="text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                {...register('password')}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-3 disabled:opacity-50"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Nhớ mật khẩu
              </label>
              <a href="#" className="text-orange-500 hover:underline">Quên mật khẩu?</a>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-400 text-sm">hoặc</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={() => console.log("TODO: Google login")}
              className="flex items-center justify-center border rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Đăng nhập bằng Google
            </button>

            <p className="text-sm text-center text-gray-600 mt-6">
              Chưa có tài khoản? <Link to={'/register'} className="text-orange-500 hover:underline">Đăng kí</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
