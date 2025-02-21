// import React, { useState } from 'react';
// import { API_URL } from '../../data/apiPath';
// import { ThreeCircles } from 'react-loader-spinner';
// import "./Register.css";

// const Register = ({ showLoginHandler = () => {}, userType = "vendor" }) => { 
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(""); // Clear previous errors

//     try {
//       const response = await fetch(`${API_URL}/${userType}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, email, password })
//       });

//       const text = await response.text(); // Read response as text
//       console.log("Raw response:", text); // Debugging log

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         throw new Error("Invalid JSON response from server.");
//       }

//       if (response.ok) {
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         console.log("Success:", data);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully`);

//         if (typeof showLoginHandler === 'function') {
//           showLoginHandler(); // Ensure function is valid before calling
//         } else {
//           console.error("showLoginHandler is not a function");
//         }
//       } else {
//         throw new Error(data.error || "Unknown registration error");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//       setError(error.message);
//       alert(`Registration Failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="registerSection">
//       {loading && 
//         <div className="loaderSection">
//           <ThreeCircles
//             visible={loading}
//             height={100}
//             width={100}
//             color="#4fa94d"
//             ariaLabel="three-circles-loading"
//           />
//           <p>Hi, Your Registration is under process</p>
//         </div>
//       }
//       {!loading &&
//         <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>
//           <h3>{userType.charAt(0).toUpperCase() + userType.slice(1)} Register</h3>
//           <label>Username</label>
//           <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your name' /><br />
//           <label>Email</label>
//           <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />
//           <label>Password</label>
//           <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Enter your password' /><br />
//           <span className='showPassword' onClick={handleShowPassword}>
//             {showPassword ? 'Hide' : 'Show'}
//           </span>
//           {error && <p className="errorMessage">{error}</p>}
//           <div className="btnSubmit">
//             <button type='submit'>Submit</button>
//           </div>
//         </form>
//       }
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';

const Register = ({ showLoginHandler = () => {} }) => { // Default empty function
  const API_URL = 'http://localhost:4000'; // Ensure backend is running at this port
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/buyer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${text}`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Server response is not in JSON format.");
      }

      alert("Buyer registered successfully");
      
      // Ensure showLoginHandler is a function before calling
      if (typeof showLoginHandler === 'function') {
        showLoginHandler();
      } else {
        console.error("showLoginHandler is not a function");
      }
      
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={registerHandler}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
