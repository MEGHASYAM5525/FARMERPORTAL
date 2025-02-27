// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const BuyerDashboardStats = ({ orders, payments, products }) => {
//   // Mock data for the bar chart
//   const data = [
//     { name: 'Jan', usage: 30 },
//     { name: 'Feb', usage: 20 },
//     { name: 'Mar', usage: 50 },
//     { name: 'Apr', usage: 40 },
//     { name: 'May', usage: 70 },
//     { name: 'Jun', usage: 60 },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
//       <div className="grid grid-cols-3 gap-4">
//         <div className="p-4 bg-white rounded-2xl shadow">
//           <h3 className="text-xl font-semibold">Total Orders</h3>
//           <p className="text-3xl">{orders}</p>
//         </div>
//         <div className="p-4 bg-white rounded-2xl shadow">
//           <h3 className="text-xl font-semibold">Total Payments</h3>
//           <p className="text-3xl">₹{payments}</p>
//         </div>
//         <div className="p-4 bg-white rounded-2xl shadow">
//           <h3 className="text-xl font-semibold">Purchased Products</h3>
//           <p className="text-3xl">{products}</p>
//         </div>
//       </div>
//       <div className="mt-6 bg-white p-4 rounded-2xl shadow">
//         <h3 className="text-xl font-semibold mb-2">Usage Statistics</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="usage" fill="#8884d8" radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default BuyerDashboardStats;


import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { API_URL, API_PATHS } from '../data/apiPath';
import axios from 'axios';

const BuyerDashboardStats = () => {
  const [stats, setStats] = useState({ orders: 0, payments: 0, products: 0 });


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const buyerId = localStorage.getItem("buyerId"); // ✅ Get buyerId from localStorage
        if (!buyerId) {
          console.error("Buyer ID not found in localStorage.");
          return;
        }
  
        const response = await axios.get(`${API_URL}${API_PATHS.BUYER_STATS}${buyerId}`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching buyer stats:", error);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-3xl">{stats.orders}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Total Payments</h3>
          <p className="text-3xl">₹{stats.payments}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Purchased Products</h3>
          <p className="text-3xl">{stats.products}</p>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-2">Usage Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Jan', usage: 30 },
            { name: 'Feb', usage: 20 },
            { name: 'Mar', usage: 50 },
            { name: 'Apr', usage: 40 },
            { name: 'May', usage: 70 },
            { name: 'Jun', usage: 60 },
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BuyerDashboardStats;
