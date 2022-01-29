import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/index';
import { NavItem } from '../../types'
import './Header.css'

const Header = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.verified);
  const isDark = useAppSelector((state: RootState) => state.theme.isDark)

  return (
    <header className={isDark ? 'dark' : undefined }>
      <nav className="nav">
        <div className="nav__items">
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
  {
    label: 'Bindung und Erziehung',
    path: '/bonding-and-upbringing'
  },
  {
    label: 'Glaube',
    path: '/belief'
  },
  {
    label: 'Ernährung',
    path: '/diet'
  },
  {
    label: 'Wohnliches',
    path: '/livable'
  },
  {
    label: 'Über mich',
    path: '/about'
  },
  {
    label: 'Admin',
    path: '/admin'
  }
]

export default Header;