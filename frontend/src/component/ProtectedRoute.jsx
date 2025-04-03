



import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  
 
  console.log("ProtectedRoute state:", { user, loading, allowedRoles });
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
   
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
  
    return <Navigate to="/" replace />;
  }
  
 
  return children;
};

export default ProtectedRoute;