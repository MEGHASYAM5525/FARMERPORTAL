// import React, { useState } from 'react';
// import { API_URL } from '../../data/apiPath';
// import { ThreeCircles } from 'react-loader-spinner';
// import "./Login.css";

// const Login = ({ showWelcomeHandler, userType = "vendor" }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const loginHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await fetch(`${API_URL}/${userType}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const text = await response.text();  // Get response as text
//       console.log("Raw response:", text);  // Debugging log

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         throw new Error("Invalid JSON response from server.");
//       }

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       if (!data.token) {
//         throw new Error("No token received, authentication failed.");
//       }

//       localStorage.setItem('loginToken', data.token);
//       alert('Login successful');
//       setEmail("");
//       setPassword("");

//       if (userType === "vendor") {
//         const vendorId = data.vendorId;
//         console.log("Checking VendorId:", vendorId);

//         const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
//         if (!vendorResponse.ok) throw new Error("Failed to fetch vendor details");

//         const vendorData = await vendorResponse.json();
//         const vendorFirmId = vendorData.vendorFirmId;
//         const vendorFirmName = vendorData.vendor.firm[0]?.firmName;

//         localStorage.setItem('firmId', vendorFirmId);
//         localStorage.setItem('firmName', vendorFirmName);
//       }

//       showWelcomeHandler();
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert(`Login Failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="loginSection">
//       {loading && <div className="loaderSection">
//         <ThreeCircles
//           visible={loading}
//           height={100}
//           width={100}
//           color="#4fa94d"
//           ariaLabel="three-circles-loading"
//         />
//         <p>Login in process... Please wait</p>
//       </div>}
//       {!loading && <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
//         <h3>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h3>
//         <label>Email</label>
//         <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />
//         <label>Password</label>
//         <input type={showPassword ? "text" : "password"} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' /><br />
//         <span className='showPassword' onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
//         <div className="btnSubmit">
//           <button type='submit'>Submit</button>
//         </div>
//       </form>}
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { API_URL } from '../../data/apiPath';
// import { ThreeCircles } from 'react-loader-spinner';
// import "./Login.css";

// const Login = ({ showWelcomeHandler }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const loginHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/buyer/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const text = await response.text();  // Read response as text first
//       console.log("Raw API Response:", text);  // Debugging log

//       let data;
//       try {
//         data = JSON.parse(text);  // Try parsing JSON
//       } catch (jsonError) {
//         throw new Error("Server response is not JSON. Possible server error.");
//       }

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       // Successful login
//       alert('Login successful');
//       localStorage.setItem('loginToken', data.token);
//       setEmail("");
//       setPassword("");
//       showWelcomeHandler();

//       // Fetch buyer details after login
//       const buyerId = data.buyerId;
//       console.log("Checking for BuyerId:", buyerId);

//       const buyerResponse = await fetch(`${API_URL}/buyer/single-buyer/${buyerId}`);
//       const buyerData = await buyerResponse.json();

//       if (buyerResponse.ok) {
//         const buyerFirmId = buyerData.buyerFirmId;
//         const buyerFirmName = buyerData.buyer?.firm[0]?.firmName || "Unknown Firm";
//         localStorage.setItem('firmId', buyerFirmId);
//         localStorage.setItem('firmName', buyerFirmName);
//       }

//       window.location.reload();
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert(`Login Failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="loginSection">
//       {loading && (
//         <div className="loaderSection">
//           <ThreeCircles
//             visible={loading}
//             height={100}
//             width={100}
//             color="#4fa94d"
//             ariaLabel="three-circles-loading"
//           />
//           <p>Logging in... Please wait</p>
//         </div>
//       )}
//       {!loading && (
//         <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
//           <h3>Buyer Login</h3>
//           <label>Email</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='Enter your email'
//           /><br />
//           <label>Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Enter your password'
//           /><br />
//           <span className='showPassword' onClick={handleShowPassword}>
//             {showPassword ? 'Hide' : 'Show'}
//           </span>
//           <div className="btnSubmit">
//             <button type='submit'>Submit</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔄 Sending login request...");

      const response = await fetch(`${API_URL}/buyer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // ✅ Read raw response before attempting JSON parsing
      // const rawText = await response.text();
      // console.log("🔥 Raw API Response:", rawText);

      let data;
      try {
        // data = JSON.parse(rawText);
        data = response.json();
      } catch (jsonError) {
        // console.error("❌ Server returned non-JSON data:", rawText);
        throw new Error("Server response is not in JSON format. Possible backend issue.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      console.log("✅ Login Successful:", data);
      alert('✅ Login successful');
      localStorage.setItem('loginToken', data.token);

      setEmail("");
      setPassword("");
      // showWelcomeHandler();

      // Fetch buyer details after login
      if (data.buyerId) {
        console.log("🔍 Fetching buyer details...");
        const buyerResponse = await fetch(`${API_URL}/buyer/single-buyer/${data.buyerId}`);

        let buyerData;
        try {
          buyerData = JSON.parse(buyerRawText);
        } catch (buyerJsonError) {
          throw new Error("Buyer API response is not in JSON format.");
        }

        if (!buyerResponse.ok) {
          throw new Error(buyerData.error || "Failed to fetch buyer details.");
        }

        console.log("✅ Buyer Details Fetched:", buyerData);
        localStorage.setItem('firmId', buyerData?.buyerFirmId || "N/A");
        localStorage.setItem('firmName', buyerData?.buyer?.firm?.[0]?.firmName || "Unknown Firm");
      }

      window.location.reload();
    } catch (error) {
      console.error("🚨 Login Failed:", error);
      alert(`❌ Login Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Logging in... Please wait</p>
        </div>
      )}
      {!loading && (
        <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
          <h3>Buyer Login</h3>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          /><br />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          /><br />
          <span className='showPassword' onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
          <div className="btnSubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;