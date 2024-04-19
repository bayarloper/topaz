// utils/auth.tsx

// Define the key used for storing the token in local storage
const TOKEN_KEY = 'token';

// Function to login the user and store the token in local storage
export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Function to logout the user and remove the token from local storage
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Function to retrieve the token from local storage
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Function to check if the user is authenticated based on the presence of the token
export const isAuthenticated = () => {
    return getToken() !== null;
};
