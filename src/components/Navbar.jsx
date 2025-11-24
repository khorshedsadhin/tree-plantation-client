import { use } from 'react';
import { Link, NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { TbPlant } from 'react-icons/tb'; 
import { HiOutlineMenuAlt1 } from 'react-icons/hi'; 
import { AuthContext } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((err) => toast.error(err.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/upcoming-events">Upcoming Events</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/create-event">Create Event</NavLink>
          </li>
          <li>
            <NavLink to="/manage-events">Manage Events</NavLink>
          </li>
          <li>
            <NavLink to="/joined-events">Joined Events</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiOutlineMenuAlt1 className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <Link
          to="/"
          className="btn btn-ghost text-2xl font-serif text-primary" 
        >
          <TbPlant />
          TreePlant
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title={user.displayName} 
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy='no-referrer'
                  alt="User profile"
                  src={user?.photoURL || "https://image2url.com/images/1763958747142-18ef179b-bbdb-404b-87c8-f303f55c97ae.png"} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/create-event">Create Event</NavLink>
              </li>
              <li>
                <NavLink to="/manage-events">Manage Events</NavLink>
              </li>
              <li>
                <NavLink to="/joined-events">Joined Events</NavLink>
              </li>
              <li className="mt-2">
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-error text-error-content" 
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;