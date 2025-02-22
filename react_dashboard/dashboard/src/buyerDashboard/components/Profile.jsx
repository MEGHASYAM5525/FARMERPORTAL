import React, { useState, useEffect, useContext } from 'react';
// import { UserContext } from "../../Context/UserContext";
 // Adjust the path as per your project structure

const Profile = () => {
    const { user } = useContext(UserContext); // Assuming user data is managed in context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);
    
    const handlePasswordUpdate = () => {
        // Logic to update password (API call or local update)
        console.log("Password Updated:", password);
        alert("Password updated successfully!");
    };
    
    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <div>
                <label>Update Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter new password" 
                />
                <button onClick={handlePasswordUpdate}>Update Password</button>
            </div>
        </div>
    );
};

export default Profile;
