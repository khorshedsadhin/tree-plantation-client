import { use, useEffect } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { AuthContext } from '../contexts/AuthContext';
const ThemeToggle = () => {
  const {theme, setTheme} = use(AuthContext);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === 'dark'}
      />

      <LuSun className="swap-on h-6 w-6" />

      <LuMoon className="swap-off h-6 w-6" />
    </label>
  );
};

export default ThemeToggle;