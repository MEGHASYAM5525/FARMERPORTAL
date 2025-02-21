// import React, { useState, useContext, useEffect } from 'react';

// import { NavLink } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';
// import { AuthContext } from '../../Context/Auth/auth-context';

// import './NavLinks.css';

// const NavLinks = () => {
//     const auth = useContext(AuthContext);
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     useEffect(() => {
//         if (auth.isLoggedIn) {
//             setShow(false);
//         }
//     }, [auth.isLoggedIn]);

//     return (
//         <React.Fragment>

//             <NavLink className="nav-route" to="/" exact>Home</NavLink>
//             <NavLink className="nav-route" to="/shop" exact>Shop</NavLink>
           
//             <NavLink className="nav-route" to="/about" exact>About</NavLink>
//             {auth.isLoggedIn && (
//                 <div className="dropdown-nav-button">
//                     <NavDropdown id="dropdown-basic-button" title="Account">
//                         <NavLink className="dropdown-item" to="/profile" exact>Profile</NavLink>
//                         <NavLink className="dropdown-item" to="/orders" exact>Orders</NavLink>
//                         <NavLink className="dropdown-item" to="/favorites" exact>Favorites</NavLink>
//                         <NavLink className="dropdown-item" to="/about" exact>About</NavLink>
//                         <NavDropdown.Divider />
//                         <NavLink className="dropdown-item" to="/logout" exact>Logout</NavLink>
//                     </NavDropdown>
//                 </div>
//             )}
//             {!auth.isLoggedIn && (
//                 <button className="login-btn" onClick={handleShow}>Login</button>
//             )}
//             {auth.isLoggedIn && (
//                 <button className="login-btn" onClick={auth.logout}>Logout</button>
//             )}
//         </React.Fragment>
//     );
// };

// export default NavLinks;

// import React, { useState, useContext, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';
// import { AuthContext } from '../../Context/Auth/auth-context';

// import './NavLinks.css';

// const NavLinks = () => {
//     const auth = useContext(AuthContext);
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     useEffect(() => {
//         if (auth.isLoggedIn) {
//             setShow(false);
//         }
//     }, [auth.isLoggedIn]);

//     return (
//         <React.Fragment>
//             <NavLink className="nav-route" to="/" exact>Home</NavLink>
//             <NavLink className="nav-route" to="/shop" exact>Shop</NavLink>
//             <NavLink className="nav-route" to="/about" exact>About</NavLink>

//             {auth.isLoggedIn ? (
//                 <div className="dropdown-nav-button">
//                     <NavDropdown id="dropdown-basic-button" title="Account">
//                         <NavLink className="dropdown-item" to="/profile" exact>Profile</NavLink>
//                         <NavLink className="dropdown-item" to="/orders" exact>Orders</NavLink>
//                         <NavLink className="dropdown-item" to="/favorites" exact>Favorites</NavLink>
//                         <NavLink className="dropdown-item" to="/about" exact>About</NavLink>
//                         <NavDropdown.Divider />
//                         <NavLink className="dropdown-item" to="/logout" exact>Logout</NavLink>
//                     </NavDropdown>
//                 </div>
//             ) : (
//                 <div className="auth-buttons">
//                     <button className="login-btn" onClick={handleShow}>Login</button>
//                     <NavLink to="/register" className="register-btn">Register</NavLink>
//                 </div>
//             )}

//             {auth.isLoggedIn && <button className="login-btn" onClick={auth.logout}>Logout</button>}
//         </React.Fragment>
//     );
// };

// export default NavLinks;


import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../Context/Auth/auth-context';
import './NavLinks.css';


const NavLinks = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <NavLink className="nav-route" to="/" exact>Home</NavLink>
            <NavLink className="nav-route" to="/shop" exact>Shop</NavLink>
            <NavLink className="nav-route" to="/about" exact>About</NavLink>

            {auth.isLoggedIn ? (
                <div className="dropdown-nav-button">
                    <NavDropdown id="dropdown-basic-button" title="Account">
                        <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                        <NavLink className="dropdown-item" to="/orders">Orders</NavLink>
                        <NavLink className="dropdown-item" to="/favorites">Favorites</NavLink>
                        <NavLink className="dropdown-item" to="/about">About</NavLink>
                        <NavDropdown.Divider />
                        <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                    </NavDropdown>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
                </div>
            )}

            {auth.isLoggedIn && <button className="login-btn" onClick={auth.logout}>Logout</button>}
        </React.Fragment>
    );
};

export default NavLinks;

