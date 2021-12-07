import { NavLink } from 'react-router-dom';
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