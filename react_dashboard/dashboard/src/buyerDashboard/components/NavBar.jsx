// import React from 'react'

// const NavBar = ({showLoginHandler, showRegisterHandler, showLogOut, logOutHandler}) => {
  
//   const firmName = localStorage.getItem('firmName')

//   return (
//     <div className="navSection">
      
//         <div className="company">
//             Buyer Dashboard
//         </div>
        
//         <div className="userAuth">
//           {!showLogOut ?  <>
//            <span onClick={showLoginHandler}>Login / </span>
//           <span onClick={showRegisterHandler}>Register</span>
//           </> : <span onClick={logOutHandler}
//           className='logout'
//           >Logout</span>  }
          
//         </div>
//     </div>
//   )
// }

// export default NavBar

// import React from "react";

// const NavBar = ({ setCurrentPage }) => {
//   return (
//     <nav>
//       <h1>Buyer Dashboard</h1>
//       <button onClick={() => setCurrentPage("home")}>Home</button>
//       <button onClick={() => setCurrentPage("shop")}>Shop</button>
//     </nav>
//   );
// };

// export default NavBar;

import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <h1>Buyer Dashboard</h1>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/shop")}>Shop</button> {/* ✅ Navigate correctly */}
    </nav>
  );
};

export default NavBar;



