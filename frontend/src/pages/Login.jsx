



import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { user, login, error: authError, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  
 
  useEffect(() => {
    console.log("User state in Login component:", user);
    
    if (user) {
      console.log("User is authenticated, redirecting to admin...");
      navigate("/admin");
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }
    
    try {
      console.log("Login form submitted with email:", email);
      
      const result = await login(email, password);
      console.log("Login result:", result);
      
  
      
    } catch (err) {
      console.error("Login form error:", err);
      setFormError("Invalid credentials. Please try again.");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        
        {formError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {formError}
          </div>
        )}
        
        {authError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;