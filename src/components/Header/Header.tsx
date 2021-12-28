import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/index';
import { NavItem } from '../../types'
import './Header.css'

const Header = () => {
  const isAuth = useAppSelector((state: RootState) => state.isAuth);

  return (
    <header>
      <nav className="nav">
        {navItems.map(item => {
          if (item.label === 'Admin' && !isAuth) {
            return null;
          }

          return (
            <NavLink
              className={({ isActive }) => [
                'nav__item',
                isActive ? 'active' : null
              ].join(' ')}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <hr />
    </header>
  );
};

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'About',
    path: '/about'
  },
  {
    label: 'Admin',
    path: '/admin'
  }
]

export default Header;