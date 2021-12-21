import { NavLink } from 'react-router-dom';

import { NavItem } from '../../types'
import './Header.css'

const Header = () => {
  return (
    <header>
      <nav className="nav">{navItems.map(item => 
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
        )}
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