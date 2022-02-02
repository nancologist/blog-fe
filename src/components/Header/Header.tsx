import { NavLink } from 'react-router-dom';

import './Header.css'
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/index';
import { NavItem } from '../../types';
import { categories } from '../../data';

const Header = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.verified);
  const isDark = useAppSelector((state: RootState) => state.theme.isDark)

  return (
    <header className={isDark ? 'dark' : undefined }>
      <nav className="nav">
        <div className="nav__items">
          {navItems.map(item => {
            if (item.path === '/admin' && !isAuth) {
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
        </div>
      </nav>
    </header>
  );
};

const navItems: NavItem[] = [
  {
    label: 'Startseite',
    path: '/'
  },

  ...categories.map( ({ name, value }) => ({ label: name, path: '/' + value }) ),

  {
    label: 'Über mich',
    path: '/about'
  },

  {
    label: 'Angelique',
    path: '/admin'
  }
]

export default Header;