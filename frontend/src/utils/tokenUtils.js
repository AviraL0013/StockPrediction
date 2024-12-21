// src/utils/auth.js
export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime; // Compare expiration time with current time
  };
  