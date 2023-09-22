import { useIsLoggedIn } from 'src/utils';
import { Routes as routes } from 'src/config';
import type { FunctionComponent } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg';

const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <nav
      role="navigation"
      className="navbar"
      aria-label="main navigation"
    >
      <div className="navbar-wrapper">
        <div className="brand-wrapper">
          <BulmaLogoSVG
            width="130"
            height="65"
            aria-hidden
            title="bulma.io-logo"
          />
        </div>
        <div className="navbar-routes">
          {isLoggedIn &&
            routes
              .filter(({ showInNav }) => showInNav)
              .map(({ path, name, params }) => (
                <NavLink
                  key={name}
                  to={generatePath(path, params)}
                  className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}
                >
                  {name}
                </NavLink>
              ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
