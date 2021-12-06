import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <header>
      <nav className="nav">{navItems.map(item => 
          <NavLink
            to={item.path}
            className={({ isActive }) => [
              'nav__item',
              isActive ? 'active' : null
            ].join(' ')}
          >
            {item.label}
          </NavLink>
        )}
      </nav>
    </header>
  );
};

const navItems = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'About',
    path: '/about'
  }
]

export default Header;