import { useIsLoggedIn } from 'src/utils';
import { Routes as routes } from 'src/config';
import  React,{ type FunctionComponent } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg';
import { Bars4Icon, IdentificationIcon, PencilIcon, PuzzlePieceIcon, SunIcon } from '@heroicons/react/24/outline';


const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  const icons = [
    Bars4Icon,
    IdentificationIcon,    
    PuzzlePieceIcon,
    PencilIcon,
    SunIcon,
  ]

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
              .map(({ path, name, params },index) => (
                <NavLink
                  key={name}
                  to={generatePath(path, params)}
                  className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}
                >
                  {React.createElement(icons[index], { className: 'h-[18px] w-[18px] mr-2' })} {name}
                </NavLink>
              ))}
        </div>
     
      </div>       
    </nav>
  );
};

export default Navbar;
