import { Link } from 'react-router';
import { TbTree } from "react-icons/tb";
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ErrorPage = () => {
  const {theme} = use(AuthContext);

  return (
    <div data-theme = {theme} className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
      <div className="relative">
        <TbTree className="text-9xl text-base-content/10" />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-primary">
          404
        </h1>
      </div>
      
      <h2 className="text-3xl font-serif font-bold mt-8 mb-4">Page Not Found</h2>
      <p className="max-w-md mx-auto text-base-content/70 mb-8">
        It looks like the path you've taken leads to a barren land. 
        Let's get you back to the green zone.
      </p>

      <Link to="/" className="btn btn-primary text-white px-8">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;