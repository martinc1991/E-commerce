import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';

funcion Sidebar(){
  const[sidebar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sidebar);

  return(
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu actuve' : 'nav-menu'}>
        <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                  <AiIcons-AiOutlineClose/>
              </Link>
            </li>
        </ul>
      </nav>
    </>
);
}

export default Sidebar;
