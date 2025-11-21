import { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signIn, googleSignIn, setLoading } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const toastId = toast.loading('Logging in...');
    signIn(data.email, data.password)
      .then((result) => {
        toast.success('Logged in successfully!', { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message, { id: toastId });
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        toast.success('Logged in successfully!', { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message, { id: toastId });
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-3xl font-bold">Login now!</h1>
          
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input input-bordered"
            />
            {errors.email && <span className="text-error">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="input input-bordered"
            />
            {errors.password && <span className="text-error">{errors.password.message}</span>}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          
          <p className="text-center">
            New here?{' '}
            <Link to="/register" className="link link-primary">
              Create an account
            </Link>
          </p>
        </form>
        
        {/* Social Login */}
        <div className="divider px-8">OR</div>
        <div className="card-body pt-0">
          <button onClick={handleGoogleSignIn} className="btn btn-outline">
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;