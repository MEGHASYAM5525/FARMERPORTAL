// import React, {useState, useEffect} from 'react'
// import NavBar from '../components/NavBar'
// import SideBar from '../components/SideBar'
// import Login from '../components/forms/Login'
// import Register from '../components/forms/Register'
// import AddFirm from '../components/forms/AddFirm'
// import AddProduct from '../components/forms/AddProduct'
// import Welcome from '../components/Welcome'
// import AllProducts from '../components/AllProducts'


// const LandingPage = () => {
//   const [showLogin, setShowLogin] = useState(false)
//   const [showRegister, setShowRegister] = useState(false)
//   const [showFirm, setShowFirm] = useState(false)
//   const [showProduct, setShowProduct] = useState(false)
//   const [showWelcome, setShowWelcome] = useState(false)
//   const [showAllProducts, setShowAllProducts] = useState(false);
//   const [showLogOut, setShowLogOut] = useState(false)
//   const [showFirmTitle, setShowFirmTitle] = useState(true)

//   useEffect(()=>{
//     const loginToken = localStorage.getItem('loginToken');
//     if(loginToken){
//         setShowLogOut(true)
//         setShowWelcome(true)
//     }
//   }, [])

//   useEffect(()=>{
//       const firmName = localStorage.getItem('firmName');
//       const firmId = localStorage.getItem('firmId')
//       if(firmName || firmId ){
//           setShowFirmTitle(false)
//           setShowWelcome(true)
//       }
//   },[])



//   const logOutHandler =()=>{
//     confirm("Are you sure to logout?")
//       localStorage.removeItem("loginToken");
//       localStorage.removeItem("firmId");
//       localStorage.removeItem('firmName');
//       setShowLogOut(false)
//       setShowFirmTitle(true)
//       setShowWelcome(false)
//   }

// const showLoginHandler =()=>{
//     setShowLogin(true)
//     setShowRegister(false)
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(false)

// }

// const showRegisterHandler = ()=>{
//     setShowRegister(true)
//     setShowLogin(false)
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(false)

// }

// const showFirmHandler = ()=>{
//   if(showLogOut){
//     setShowRegister(false)
//     setShowLogin(false)
//     setShowFirm(true)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(false)
//   }else{
//     alert("please login");
//     setShowLogin(true)
//   }
// }
// const showProductHandler = ()=>{
//   if(showLogOut){
//     setShowRegister(false)
//     setShowLogin(false)
//     setShowFirm(false)
//     setShowProduct(true)
//     setShowWelcome(false)
//     setShowAllProducts(false)
//     }else{
//         alert("please login")
//         setShowLogin(true)
//     }

// }
// const showWelcomeHandler = ()=>{
//     setShowRegister(false)
//     setShowLogin(false)
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(true)
//     setShowAllProducts(false)

// }
// const showAllProductsHandler = ()=>{
//   if(showLogOut){
//     setShowRegister(false)
//     setShowLogin(false)
//     setShowFirm(false)
//     setShowProduct(false)
//     setShowWelcome(false)
//     setShowAllProducts(true)

// }else{
//     alert("please login")
//     setShowLogin(true)
//  }
// }
//   return (
//     <>
//         <section className='landingSection'>
//             <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}
//             showLogOut = {showLogOut}
//             logOutHandler = {logOutHandler}
//             />
//             <div className="collectionSection">
//             <SideBar showFirmHandler={showFirmHandler} showProductHandler ={showProductHandler}
//             showAllProductsHandler = {showAllProductsHandler}
//             showFirmTitle={showFirmTitle}
//             />
//           {showFirm && showLogOut && <AddFirm />}
//           {showProduct && showLogOut && <AddProduct />}
//           {showWelcome && <Welcome />}
//           {showAllProducts && showLogOut && <AllProducts />}
//           {showLogin && <Login showWelcomeHandler ={showWelcomeHandler}/>}
//           {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
        
//             </div>
//         </section>
//     </>
//   )
// }

// export default LandingPage

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";
import FarmerOrders from "../components/FarmerOrders"; // ✅ Import FarmerOrders

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false); // ✅ Added state for Orders
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    try {const firmName = localStorage.getItem("firmName");
    const firmId = localStorage.getItem("firmId");
    if (firmName || firmId) {
      setShowFirmTitle(false);
      setShowWelcome(true);
    } 
  } catch (error) {
      console.error("Error retrieving firm data:", error);
    }
  }, []);

  const logOutHandler = () => {
    confirm("Are you sure to logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false);
    setShowFirmTitle(true);
    setShowWelcome(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowOrders(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowOrders(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = ()=>{
        setShowRegister(false)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(true)
        setShowAllProducts(false)
    
    }
  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showOrdersHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(true); // ✅ Show Orders
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showOrdersHandler={showOrdersHandler} // ✅ Pass Orders handler
            showFirmTitle={showFirmTitle}
          />

          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showOrders && showLogOut && <FarmerOrders />} {/* ✅ Render FarmerOrders */}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
