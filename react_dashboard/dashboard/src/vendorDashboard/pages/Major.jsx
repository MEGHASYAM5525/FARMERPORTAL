// import { useNavigate } from "react-router-dom";

// function Major() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Welcome to Major Page</h1>
//       <button onClick={() => navigate("/landing")}>Farmer</button>
//       <button onClick={() => navigate("/Buyerlanding")}>Buyer</button>
//     </div>
//   );
// }

// export default Major;

import React from "react";
import { useNavigate } from "react-router-dom";

const Major = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Major Page</h1>
      <button onClick={() => navigate("/landing")}>Farmer</button>
      <button onClick={() => navigate("/Buyerlanding")}>Buyer</button>
    </div>
  );
};

export default Major;
